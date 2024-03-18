import { Box, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
  const googleSignin = () => {
    window.location.href = googleURL;
  };
  return (
    <Box
      width="3.5rem"
      height="3.5rem"
      borderRadius="full"
      backgroundColor="white"
      borderWidth={1}
      borderColor="gray"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        borderRadius="full"
        backgroundColor="white"
        _hover={{ bg: "white" }}
        _active={{ bg: "ghost" }}
        onClick={googleSignin}
      >
        <FcGoogle size="40" color="white" />
      </Button>
    </Box>
  );
};

export default GoogleLoginButton;
