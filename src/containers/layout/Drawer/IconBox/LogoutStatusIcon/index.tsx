import { Tooltip, Flex, Icon } from "@chakra-ui/react";
import { SlLogin } from "react-icons/sl";

export const LogoutStatusIcon = () => {
  return (
    <Tooltip label="login">
      <Flex
        fontSize={30}
        fontWeight={"bold"}
        backgroundColor={"blackAlpha.200"}
        w={12}
        h={12}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={8}
        as={"button"}
      >
        <Icon as={SlLogin} />
      </Flex>
    </Tooltip>
  );
};
