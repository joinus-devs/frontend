import { getKakaoId, issueKakaoToken, signInSocial } from "@/apis/auth";
import { AuthLoading } from "@/containers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {};

const KakaoSignin = (props: Props) => {
  const router = useRouter();
  const kakaoCode = router.query.code;

  const { mutate: getToken, data: kakaoToken } = useMutation({
    mutationFn: issueKakaoToken,
  });

  useEffect(() => {
    if (!kakaoCode) return;
    getToken(kakaoCode);
  }, [kakaoCode, getToken]);

  const { data: kakaoInfo } = useQuery({
    queryKey: ["kakao-info", kakaoToken?.access_token],
    queryFn: () => getKakaoId(kakaoToken?.access_token),
    enabled: !!kakaoToken,
  });

  const { data: signInToken } = useQuery({
    queryKey: ["kakao-signin", kakaoInfo?.id],
    queryFn: () => signInSocial(kakaoInfo?.id, "kakao"),
    enabled: !!kakaoInfo,
  });

  useEffect(() => {
    if (!kakaoInfo?.id) return;
    if (signInToken?.data?.token) {
      localStorage.setItem("login-token", signInToken.data.token);
      router.push("/");
    } else {
      router.push({
        pathname: "/auth/register/social",
        query: {
          socialId: kakaoInfo.id,
          type: "kakao",
        },
      });
    }
  }, [signInToken, router, kakaoInfo]);

  return <AuthLoading />;
};

export default KakaoSignin;
