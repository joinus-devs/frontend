import { Box, Button } from "@chakra-ui/react";
import { SiNaver } from "react-icons/si";

interface NaverLoginButtonProps {
  onClick?: () => void;
}

const NaverLoginButton = ({ onClick }: NaverLoginButtonProps) => {
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
        onClick={onClick}
        backgroundColor="#48BB78"
      >
        <SiNaver size="40" color="white" />
      </Button>
    </Box>
  );
};

export default NaverLoginButton;
