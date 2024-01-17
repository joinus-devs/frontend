import { signIn } from "next-auth/react";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { IoChatbubble } from "react-icons/io5";

import { Box, Button, Center, HStack } from "@chakra-ui/react";

const SocialLoginButton = () => {
  return (
    <Center mt={6}>
      <HStack spacing={7}>
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
            onClick={() => signIn("naver", { callbackUrl: "/" })}
          >
            <SiNaver size="40" color="white" />
          </Button>
        </Box>

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
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
          >
            <IoChatbubble size="40" color="black" />
          </Button>
        </Box>

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
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle size="40" color="white" />
          </Button>
        </Box>
      </HStack>
    </Center>
  );
};

export default SocialLoginButton;
