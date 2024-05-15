import { Box, Flex } from "@chakra-ui/react";
import { DefaultLayoutFooter } from "./Footer";
import { DefaultLayoutHeader } from "./Header";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <DefaultLayoutHeader />
      <Flex justify={"center"}>
        <Flex
          w={{ base: "100%", md: "container.md" }}
          direction={"column"}
          mt={"100px"}
        >
          <Box as={"main"}>{children}</Box>
        </Flex>
      </Flex>
      <DefaultLayoutFooter />
    </>
  );
};

export default DefaultLayout;
