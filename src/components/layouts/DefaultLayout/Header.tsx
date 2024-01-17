import { Box, Button, useColorMode } from "@chakra-ui/react";

const DefaultLayoutHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box as={"header"} w={"100%"} bgColor={"red"}>
      Header
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </Box>
  );
};

export default DefaultLayoutHeader;
