import { Tooltip, Flex, Icon } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

export const LoginStatusIcon = () => {
  return (
    <>
      <Tooltip label="mypage">
        <Flex
          fontSize={24}
          backgroundColor={"blackAlpha.200"}
          w={12}
          h={12}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={8}
          as={"button"}
        >
          <Icon as={FaRegUser} />
        </Flex>
      </Tooltip>
      <Tooltip label="logout">
        <Flex
          fontSize={36}
          fontWeight={"bold"}
          backgroundColor={"blackAlpha.200"}
          w={12}
          h={12}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={8}
          as={"button"}
        >
          <Icon as={IoIosLogOut} />
        </Flex>
      </Tooltip>
    </>
  );
};
