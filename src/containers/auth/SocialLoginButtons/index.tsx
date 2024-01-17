import { Center, HStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const SocialLoginButtons = () => {
  return (
    <Center mt={6}>
      <HStack spacing={7}>
        <NaverLoginButton
          onClick={() => signIn("naver", { callbackUrl: "/" })}
        />

        <KakaoLoginButton
          onClick={() => signIn("kakao", { callbackUrl: "/" })}
        />

        <GoogleLoginButton
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
      </HStack>
    </Center>
  );
};

export default SocialLoginButtons;
