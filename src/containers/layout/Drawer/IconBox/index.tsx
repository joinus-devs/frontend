import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import { LogoutStatusIcon } from "./LogoutStatusIcon";
import { LoginStatusIcon } from "./LoginStatusIcon";

export const IconBox = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex gap={2} alignItems={"center"}>
      <LoginStatusIcon />
      <LogoutStatusIcon />
      <Box
        onClick={toggleColorMode}
        fontWeight={"bold"}
        as={"button"}
        backgroundColor={"blackAlpha.200"}
        h={12}
        borderRadius={8}
        pl={2}
        pr={2}
      >
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Box>
    </Flex>
  );
};
