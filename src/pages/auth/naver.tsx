import { getNaverId, issueNaverToken, signInSocial } from "@/apis";
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

const NaverSignin = (props: Props) => {
  const router = useRouter();
  const naverCode = router.query.code;
  const naverState = router.query.state;
  const queryClient = useQueryClient();

  const { data: naverToken } = useQuery({
    queryKey: ["naver-token"],
    queryFn: () => issueNaverToken(naverCode, naverState),
    enabled: !!naverCode && !!naverState,
  });

  const { data: naverInfo } = useQuery({
    queryKey: ["naver-info"],
    queryFn: () => getNaverId(naverToken?.access_token),
    enabled: !!naverToken,
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
          socialId: naverInfo?.id,
          type: type,
        },
      });
    },
  });

  useEffect(() => {
    if (!naverInfo) return;
    handleSignInSocial({ id: naverInfo?.id, type: "naver" });
  }, [naverInfo, handleSignInSocial]);

  return <AuthLoading />;
};

export default NaverSignin;
