import { Box, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

interface GoogleLoginButtonProps {
  onClick?: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
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
        onClick={onClick}
      >
        <FcGoogle size="40" color="white" />
      </Button>
    </Box>
  );
};

export default GoogleLoginButton;
