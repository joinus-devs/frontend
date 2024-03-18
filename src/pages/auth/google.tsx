import { getGoogleId, issueGoogleToken, signInSocial } from "@/apis/auth";
import { AuthLoading } from "@/containers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {};

const GoogleSignin = (props: Props) => {
  const router = useRouter();
  const googleCode = router.query.code;

  const { mutate: getToken, data: googleToken } = useMutation({
    mutationFn: issueGoogleToken,
  });

  useEffect(() => {
    if (!googleCode) return;
    getToken(googleCode);
  }, [googleCode, getToken]);

  const { data: googleInfo } = useQuery({
    queryKey: ["google-id", googleToken?.access_token],
    queryFn: () => getGoogleId(googleToken?.access_token),
    enabled: !!googleToken,
  });

  const { data: signInToken } = useQuery({
    queryKey: ["google-signIn", googleInfo?.id],
    queryFn: () => signInSocial(googleInfo?.id, "google"),
    enabled: !!googleInfo,
  });

  useEffect(() => {
    if (!googleInfo?.id) return;
    if (signInToken?.data?.token) {
      localStorage.setItem("login-token", signInToken?.data?.token);
      router.push("/");
    } else {
      router.push({
        pathname: "/auth/register/social",
        query: {
          socialId: googleInfo.id,
          type: "google",
        },
      });
    }
  });

  return <AuthLoading />;
};

export default GoogleSignin;
