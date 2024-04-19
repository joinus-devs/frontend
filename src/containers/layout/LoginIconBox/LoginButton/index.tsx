import { ApiRoutes, PageRoutes } from "@/constants";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(PageRoutes.SignIn)}>Sign in</Button>
  );
};
