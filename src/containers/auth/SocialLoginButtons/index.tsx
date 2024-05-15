import { Flex, Text } from "@chakra-ui/react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const SocialLoginButtons = () => {
  return (
    <Flex direction={"column"} gap={4}>
      <Text textAlign={"center"}>소셜 계정으로 간편 로그인</Text>
      <Flex gap={7}>
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
      </Flex>
    </Flex>
  );
};

export default SocialLoginButtons;
