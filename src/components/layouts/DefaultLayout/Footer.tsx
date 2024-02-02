import { Box, Flex } from "@chakra-ui/react";
import { Contact, TechStack } from "@/containers";

const DefaultLayoutFooter = () => {
  return (
    <Box as={"footer"} w={"100%"} bgColor={"blackAlpha.50"}>
      <Box
        width={"1280px"}
        margin={"0 auto"}
        fontSize={"lg"}
        fontWeight={"medium"}
        p={10}
      >
        <Flex>
          <Contact />
          <TechStack />
        </Flex>
      </Box>
    </Box>
  );
};

export default DefaultLayoutFooter;
