import { toCategory } from "@/constants";
import { Text, Box, Icon } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";

interface CategoryProps {
  category: string;
}
const SelectedCategory = ({ category }: CategoryProps) => {
  return (
    <Box
      p={4}
      borderRadius={12}
      backgroundColor={"primary.200"}
      fontWeight={"semibold"}
      position={"relative"}
    >
      <Text>{toCategory[category]}</Text>
      <Icon
        as={TiDelete}
        position={"absolute"}
        top={0}
        right={0}
        fontSize={20}
        _hover={{
          cursor: "pointer",
          transform: "scale(1.5)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </Box>
  );
};

export default SelectedCategory;
