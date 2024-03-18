import { Tooltip, Flex, Icon, Button } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/router";

export const LoginStatusIcon = () => {
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("login-token");
    router.push("/");
    router.reload();
  };
  return (
    <>
      <Tooltip label="my page">
        <Flex
          fontSize={20}
          w={10}
          h={10}
          justifyContent={"center"}
          alignItems={"center"}
          as={"button"}
        >
          <Icon as={FaRegUser} onClick={() => router.push("/auth/myPage")} />
        </Flex>
      </Tooltip>
      <Button onClick={() => logOut()}>Log out</Button>
    </>
  );
};
