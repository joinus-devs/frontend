import { Button, Flex, Icon, Tooltip } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { FaRegUser } from "react-icons/fa";

export const LoginStatusIcon = () => {
  const queryClient = useQueryClient();

  const handlerLogout = useCallback(() => {
    localStorage.removeItem("login-token");
    queryClient.invalidateQueries();
  }, [queryClient]);

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
          <Icon as={FaRegUser} />
        </Flex>
      </Tooltip>
      <Button onClick={handlerLogout}>Logout</Button>
    </>
  );
};
