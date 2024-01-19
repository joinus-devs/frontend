import { Icon, Flex, useColorMode, Tooltip } from "@chakra-ui/react";
import { LogoutStatusIcon } from "./LogoutStatusIcon";
import { FiMoon } from "react-icons/fi";
import { FaSun } from "react-icons/fa";
import { LoginStatusIcon } from "./LoginStatusIcon";

const IconBox = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex gap={2} alignItems={"center"}>
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
      <LoginStatusIcon />
      <LogoutStatusIcon />
    </Flex>
  );
};

export default IconBox;
