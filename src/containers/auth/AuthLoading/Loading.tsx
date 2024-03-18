import { Center, Spinner } from "@chakra-ui/react";

const AuthLoading = () => {
  return (
    <Center w="100vw" h="90vh">
      <Spinner size={"xl"} color={"primary.500"} />
    </Center>
  );
};

export default AuthLoading;
