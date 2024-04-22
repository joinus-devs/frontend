import { toCategory } from "@/constants";
import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useCallback } from "react";
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
      {categories?.map((category, index) => {
        return (
          <HStack spacing={4} key={`selected_tag_${index}`}>
            <Tag
              size={"lg"}
              borderRadius="full"
              variant="outline"
              colorScheme="primary"
              border={"1px solid"}
              bgColor={"white"}
            >
              <TagLabel fontWeight={"semibold"}>
                {toCategory[category]}
              </TagLabel>
              <TagCloseButton
                _hover={{
                  cursor: "pointer",
                  transform: "scale(1.5)",
                  transition: "all 0.5s ease",
                }}
                onClick={() => handleDelete(category)}
              />
            </Tag>
          </HStack>
        );
      })}
    </>
  );
};

export default SelectedCategories;
