import { toCategory } from "@/constants";
import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
const CategoryList = () => {
  const list = Object.values(toCategory);

  return (
    <>
      {list.map((category, index) => {
        return (
          <Box
            p={4}
            borderRadius={12}
            backgroundColor={"primary.200"}
            fontWeight={"semibold"}
            key={index}
          >
            <Text>{category}</Text>
          </Box>
        );
      })}
    </>
  );
};

export default CategoryList;
