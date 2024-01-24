import { Box } from "@chakra-ui/react";
import { useBgColor } from "@/hooks";
import { Navbar } from "@/containers";
import { useCallback, useEffect, useState } from "react";

const DefaultLayoutHeader = () => {
  const [isMax, setIsMax] = useState(false);
  const color = useBgColor();

  const scrollListener = useCallback(() => {
    setIsMax(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => scrollListener());
    return () => {
      window.removeEventListener("scroll", () => scrollListener());
    };
  }, [scrollListener]);

  return (
    <>
      <Box
        as={"header"}
        w={"100%"}
        position={"fixed"}
        top={0}
        zIndex={99}
        boxShadow={isMax ? "md" : "none"}
        backgroundColor={color}
        opacity={isMax ? 0.7 : 1}
      >
        <Navbar />
      </Box>
    </>
  );
};

export default DefaultLayoutHeader;
