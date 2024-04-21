import { PageRoutes } from "@/constants";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoLogInOutline } from "react-icons/io5";

const LoginBt = () => {
  const router = useRouter();

  return (
    <Tooltip label="로그인">
      <IconButton
        variant={"ghost"}
        aria-label="Logout"
        onClick={() => router.push(PageRoutes.SignIn)}
      >
        <Icon as={IoLogInOutline} w={"7"} h={"7"} />
      </IconButton>
    </Tooltip>
  );
};

export default LoginBt;
