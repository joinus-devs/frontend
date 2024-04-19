import { getKakaoId, issueKakaoToken, signInSocial } from "@/apis/auth";
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

const KakaoSignin = (props: Props) => {
  const router = useRouter();
  const kakaoCode = router.query.code;
  const queryClient = useQueryClient();

  const { mutate: getToken, data: kakaoToken } = useMutation({
    mutationFn: issueKakaoToken,
  });

  useEffect(() => {
    if (!kakaoCode) return;
    getToken(kakaoCode);
  }, [kakaoCode, getToken]);

  const { data: kakaoInfo } = useQuery({
    queryKey: ["kakao-info"],
    queryFn: () => getKakaoId(kakaoToken?.access_token),
    enabled: !!kakaoToken,
  });

  const { mutate: handleSignInSocial, data: signInKakao } = useMutation({
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
          socialId: kakaoInfo?.id,
          type: type,
        },
      });
    },
  });

  useEffect(() => {
    if (!kakaoInfo?.id) return;
    handleSignInSocial({ id: kakaoInfo?.id, type: "kakao" });
  }, [handleSignInSocial, kakaoInfo]);

  return <AuthLoading />;
};

export default KakaoSignin;
