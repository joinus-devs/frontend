import { useFetch, useGetMe } from "@/apis";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import { toUrl } from "@/utils";
import { Flex, Icon, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { LoginStatusIcon } from "./LoginStatusIcon";
import { LogoutStatusIcon } from "./LogoutStatusIcon";

const LoginIconBox = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: me, isSuccess, isError } = useGetMe();

  return (
    <Flex gap={2} alignItems={"center"}>
      {isSuccess ? me?.name : ""}
      <Tooltip label={`${colorMode === "dark" ? "light" : "dark"} mode`}>
        <Flex
          fontSize={20}
          w={10}
          h={10}
          justifyContent={"center"}
          alignItems={"center"}
          as={"button"}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <Icon as={FiMoon} /> : <Icon as={FaSun} />}
        </Flex>
      </Tooltip>
      {!me || isError ? <LogoutStatusIcon /> : <LoginStatusIcon />}
    </Flex>
  );
};

export default LoginIconBox;
