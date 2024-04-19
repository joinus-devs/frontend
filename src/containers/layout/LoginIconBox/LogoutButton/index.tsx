import { useLogout } from "@/apis";
import { PageRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { Button, Flex, Icon, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaRegUser } from "react-icons/fa";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useLogout();

  const handleRoute = useCallback(() => {
    router.push(toUrl(PageRoutes.AuthMypage));
  }, [router]);

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
          <Icon as={FaRegUser} onClick={handleRoute} />
        </Flex>
      </Tooltip>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};
