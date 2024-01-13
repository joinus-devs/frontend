import { useColorMode } from "@chakra-ui/react";

const useBgColor = () => {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? "white" : "var(--chakra-colors-gray-700)";
};

export default useBgColor;
