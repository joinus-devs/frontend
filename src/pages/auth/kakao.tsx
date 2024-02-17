import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeFormBody } from "@/apis/utils";

type Props = {};

const KakaoSignin = (props: Props) => {
  const router = useRouter();
  const kakaoCode = router.query.code;
  const [kakaoToken, setKakaoToken] = useState<string>("");
  const [kakaoId, setKakaoId] = useState<string>("");

  const getToken = useCallback(async () => {
    if (!kakaoCode) return;

    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${kakaoCode}`,
    }).then((res) => res.json());

    setKakaoToken(response.access_token);
  }, [kakaoCode]);

  const getUserInfo = useCallback(async () => {
    if (!kakaoToken) return;

    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => res.json());
    setKakaoId(response.id);
  }, [kakaoToken]);

  const signinSocial = useCallback(async () => {
    if (!kakaoId) return;

    const response = await fetch("http://44.204.44.65/auth/signin/social", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        social_id: kakaoId.toString(),
        type: "kakao",
      }),
    })
      .then((res) => res.json())
      .then((res) => localStorage.setItem("login-token", res.data.token))
      .then(() => router.push("/"))
      .catch(() => {
        router.push({
          pathname: "/auth/register",
          query: { socialId: kakaoId, type: "kakao" },
        });
      });
  }, [kakaoId, router]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    signinSocial();
  }, [signinSocial]);

  return <div>kakaoId : {kakaoId}</div>;
};

export default KakaoSignin;
