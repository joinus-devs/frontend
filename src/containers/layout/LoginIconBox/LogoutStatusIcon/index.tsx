import { ApiRoutes } from "@/constants";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const LogoutStatusIcon = () => {
  const router = useRouter();

  return <Button onClick={() => router.push(ApiRoutes.SignIn)}>Sign in</Button>;
};
