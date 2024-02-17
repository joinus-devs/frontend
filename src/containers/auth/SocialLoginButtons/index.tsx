import { Center, HStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const SocialLoginButtons = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  const naverURL = `https://`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Center mt={6}>
      <HStack spacing={7}>
        <NaverLoginButton
          onClick={() => signIn("naver", { redirect: true, callbackUrl: "/" })}
        />

        <KakaoLoginButton />

        <GoogleLoginButton
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
      </HStack>
    </Center>
  );
};

export default SocialLoginButtons;
