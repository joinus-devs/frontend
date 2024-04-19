import { useLogout } from "@/apis";
import { PageRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useLogout();

  const handleRoute = useCallback(() => {
    router.push(toUrl(PageRoutes.AuthMypage));
  }, [router]);

  return (
    <>
      <Tooltip label="마이페이지">
        <IconButton variant={"ghost"} aria-label="Toggle color mode">
          <Icon as={FaRegUser} onClick={handleRoute} w={"5"} h={"5"} />
        </IconButton>
      </Tooltip>
      <Tooltip label="로그아웃">
        <IconButton variant={"ghost"} aria-label="Logout" onClick={logout}>
          <Icon as={IoLogOutOutline} w={"7"} h={"7"} />
        </IconButton>
      </Tooltip>
    </>
  );
};
