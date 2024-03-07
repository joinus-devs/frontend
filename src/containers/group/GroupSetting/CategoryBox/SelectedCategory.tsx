import { toCategory } from "@/constants";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { TiDelete } from "react-icons/ti";
import { CategoryBoxProps } from ".";

const SelectedCategories = ({
  categories,
  setCategories,
}: CategoryBoxProps) => {
  const handleDelete = useCallback(
    (category: number) => {
      setCategories((prev) => {
        return prev.filter((v) => v !== category);
      });
    },
    [setCategories]
  );

  return (
    <>
      {categories.map((category, index) => {
        return (
          <Box
            p={4}
            borderRadius={12}
            backgroundColor={"primary.100"}
            fontWeight={"semibold"}
            key={index}
            position={"relative"}
          >
            <Text>{toCategory[category]}</Text>
            <Icon
              as={TiDelete}
              position={"absolute"}
              top={0}
              right={0}
              _hover={{
                cursor: "pointer",
                transform: "scale(1.5)",
                transition: "all 0.5s ease",
              }}
              onClick={() => handleDelete(category)}
            />
          </Box>
        );
      })}
    </>
  );
};

export default SelectedCategories;
