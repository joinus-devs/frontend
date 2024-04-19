import { Center, HStack } from "@chakra-ui/react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const SocialLoginButtons = () => {
  return (
    <Center mt={6}>
      <HStack spacing={7}>
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
      </HStack>
    </Center>
  );
};

export default SocialLoginButtons;
