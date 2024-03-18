import { getNaverId, issueNaverToken, signInSocial } from "@/apis";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

type Props = {};

const NaverSignin = (props: Props) => {
  const router = useRouter();
  const naverCode = router.query.code;
  const naverState = router.query.state;

  const { data: naverToken } = useQuery({
    queryKey: ["naver-token", naverCode, naverState],
    queryFn: () => issueNaverToken(naverCode, naverState),
    enabled: !!naverCode && !!naverState,
  });

  const { data: naverInfo } = useQuery({
    queryKey: ["naver-info", naverToken?.access_token],
    queryFn: () => getNaverId(naverToken?.access_token),
    enabled: !!naverToken,
  });

  const { data: signInToken } = useQuery({
    queryKey: ["naver-signin", naverInfo?.id],
    queryFn: () => signInSocial(naverInfo?.id, "naver"),
    enabled: !!naverInfo,
  });

  useEffect(() => {
    if (!naverInfo) return;
    if (signInToken?.data?.token) {
      localStorage.setItem("login-token", signInToken.data.token);
      router.push("/");
    } else {
      router.push({
        pathname: "/auth/register/social",
        query: {
          socialId: naverInfo.id,
          type: "naver",
        },
      });
    }
  }, [signInToken, router, naverInfo]);

  return <Spinner />;
};

export default NaverSignin;
