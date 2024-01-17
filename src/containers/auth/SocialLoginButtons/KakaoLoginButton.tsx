import { Box, Button } from "@chakra-ui/react";
import { IoChatbubble } from "react-icons/io5";

interface KakaoLoginButtonProps {
  onClick?: () => void;
}

const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
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
        onClick={onClick}
      >
        <IoChatbubble size="40" color="black" />
      </Button>
    </Box>
  );
};

export default KakaoLoginButton;
