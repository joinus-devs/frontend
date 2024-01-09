import { Box, Flex } from "@chakra-ui/react";
import DefaultLayoutFooter from "./Footer";
import DefaultLayoutHeader from "./Header";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Flex justify={"center"}>
      <Flex w={{ base: "100%", xl: "1280px" }} direction={"column"}>
        <DefaultLayoutHeader />
        <Box as={"main"}>{children}</Box>
        <DefaultLayoutFooter />
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
