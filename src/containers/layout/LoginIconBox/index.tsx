import { Icon, Flex, useColorMode, Tooltip } from "@chakra-ui/react";
import { LogoutStatusIcon } from "./LogoutStatusIcon";
import { FiMoon } from "react-icons/fi";
import { FaSun } from "react-icons/fa";
import { LoginStatusIcon } from "./LoginStatusIcon";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, toCheckToken } from "@/apis/auth";
import userStore from "@/stores/userInfo";

const LoginIconBox = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { setUserName, setUserProfile } = userStore();

  useEffect(() => {
    const token = toCheckToken();
    if (token) {
      setHasToken(true);
    }
  }, [setHasToken]);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (!userInfo) return;
    setUserName(userInfo?.name as string);
  }, [setUserName, userInfo]);

  return (
    <Flex gap={2} alignItems={"center"}>
      {userInfo?.name}
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
