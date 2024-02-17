import { Icon, Flex, useColorMode, Tooltip } from "@chakra-ui/react";
import { LogoutStatusIcon } from "./LogoutStatusIcon";
import { FiMoon } from "react-icons/fi";
import { FaSun } from "react-icons/fa";
import { LoginStatusIcon } from "./LoginStatusIcon";
import { useEffect, useState } from "react";
import { tokenCheck } from "@/apis/utils";

const LoginIconBox = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const token = tokenCheck();
    if (token) {
      setHasToken(true);
    }
  }, [setHasToken]);

  // auth/me
  useEffect(() => {
    fetch("http://44.204.44.65/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("login-token") || "",
      },
    })
      .then((res) => res.json())
      .then((res) => setUsername(res?.data?.name));
  }, [setHasToken]);

  return (
    <Flex gap={2} alignItems={"center"}>
      {username}
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
      {hasToken ? <LoginStatusIcon /> : <LogoutStatusIcon />}
    </Flex>
  );
};

export default LoginIconBox;
