import { Box, Button } from "@chakra-ui/react";
import { SiNaver } from "react-icons/si";

const NaverLoginButton = () => {
  const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET}`;

  const naverSignin = () => {
    window.location.href = naverURL;
  };
  return (
    <Box
      width="3.5rem"
      height="3.5rem"
      borderRadius="full"
      backgroundColor="#48BB78"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        borderRadius="full"
        _hover={{ bg: "ghost" }}
        _active={{ bg: "ghost" }}
        onClick={naverSignin}
        backgroundColor="#48BB78"
      >
        <SiNaver size="40" color="white" />
      </Button>
    </Box>
  );
};

export default NaverLoginButton;
