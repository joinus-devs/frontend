import { Box, Button } from "@chakra-ui/react";
import { IoChatbubble } from "react-icons/io5";
interface KakaoLoginButtonProps {
  onClick?: () => void;
}

// const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
const KakaoLoginButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  const kakaoSignin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Box
      width="3.5rem"
      height="3.5rem"
      borderRadius="full"
      backgroundColor="yellow"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        borderRadius="full"
        backgroundColor="yellow"
        _hover={{ bg: "ghost" }}
        _active={{ bg: "ghost" }}
        onClick={kakaoSignin}
      >
        <IoChatbubble size="40" color="black" />
      </Button>
    </Box>
  );
};

export default KakaoLoginButton;
