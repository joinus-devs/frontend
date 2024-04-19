import { useGetMe } from "@/apis";
import {
  Flex,
  Icon,
  IconButton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

const LoginIconBox = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: me, isSuccess } = useGetMe();

  return (
    <Flex gap={2} align={"center"}>
      <Tooltip label={colorMode === "dark" ? "밝게" : "어둡게"}>
        <IconButton
          variant={"ghost"}
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <Icon as={FiMoon} w={"6"} h={"6"} />
          ) : (
            <Icon as={FaSun} w={"6"} h={"6"} />
          )}
        </IconButton>
      </Tooltip>
      {me && isSuccess ? <LogoutButton /> : <LoginButton />}
    </Flex>
  );
};

export default LoginIconBox;
