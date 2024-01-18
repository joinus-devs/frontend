import { Tooltip, Flex, Icon, Button } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";

export const LoginStatusIcon = () => {
  return (
    <>
      <Tooltip label="mypage">
        <Flex
          fontSize={20}
          w={10}
          h={10}
          justifyContent={"center"}
          alignItems={"center"}
          as={"button"}
        >
          <Icon as={FaRegUser} />
        </Flex>
      </Tooltip>
      <Button>Logout</Button>
    </>
  );
};
