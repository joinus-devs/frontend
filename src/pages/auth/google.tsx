import { getGoogleId, issueGoogleToken, signInSocial } from "@/apis/auth";
import { ApiRoutes } from "@/constants";
import { AuthLoading } from "@/containers";
import { toUrl } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {};

interface SignInSocialData {
  id: number | string;
  type: string;
}

const GoogleSignin = (props: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const googleCode = router.query.code;

  const { mutate: getToken, data: googleToken } = useMutation({
    mutationFn: issueGoogleToken,
  });

  useEffect(() => {
    if (!googleCode) return;
    getToken(googleCode);
  }, [googleCode, getToken]);

  const { data: googleInfo } = useQuery({
    queryKey: ["google-info"],
    queryFn: () => getGoogleId(googleToken?.access_token),
    enabled: !!googleToken,
  });

  const { mutate: handleSignInSocial, data: signInGoogle } = useMutation({
    mutationFn: ({ id, type }: SignInSocialData) => signInSocial(id, type),
    onSuccess: (data) => {
      localStorage.setItem("login-token", data.token);
      router.push("/");
      queryClient.invalidateQueries({ queryKey: [toUrl(ApiRoutes.Me)] });
    },
    onError: (error, data) => {
      const { type } = data;
      router.push({
        pathname: "/auth/register/social",
        query: {
          socialId: googleInfo?.id,
          type: type,
        },
      });
    },
  });

  useEffect(() => {
    if (!googleInfo?.id) return;
    handleSignInSocial({ id: googleInfo?.id, type: "google" });
  }, [handleSignInSocial, googleInfo]);

  return <AuthLoading />;
};

export default GoogleSignin;
