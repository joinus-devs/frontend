import { Box, Flex } from "@chakra-ui/react";
import { Contact, TechStack } from ".";

const DefaultLayoutFooter = () => {
  return (
    <Box as={"footer"} w={"100%"} bgColor={"blackAlpha.50"}>
      <Box
        width={{ base: "100%", md: "container.md" }}
        margin={"0 auto"}
        fontSize={"lg"}
        fontWeight={"medium"}
        p={10}
      >
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: "20" }}>
          <Contact />
          <TechStack />
        </Flex>
      </Box>
    </Box>
  );
};

export default DefaultLayoutFooter;
