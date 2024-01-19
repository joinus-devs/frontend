import { Box, Text } from "@chakra-ui/react";

const DefaultLayoutFooter = () => {
  return (
    <Box as={"footer"} w={"100%"} bgColor={"blackAlpha.100"} p={10}>
      <Box
        width={"1280px"}
        margin={"0 auto"}
        fontSize={"lg"}
        fontWeight={"medium"}
      >
        <Text> Footer </Text>
      </Box>
    </Box>
  );
};

export default DefaultLayoutFooter;
