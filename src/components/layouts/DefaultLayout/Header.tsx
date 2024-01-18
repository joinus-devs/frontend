import { Box } from "@chakra-ui/react";

import { useBgColor } from "@/hooks";
import { Navbar } from "@/containers";

const DefaultLayoutHeader = () => {
  const color = useBgColor();

  return (
    <>
      <Box
        as={"header"}
        w={"100%"}
        position={"fixed"}
        top={0}
        zIndex={99}
        boxShadow={"md"}
        backgroundColor={color}
      >
        <Navbar />
      </Box>
    </>
  );
};

export default DefaultLayoutHeader;
