import { toCategory } from "@/constants";
import { useModalStore } from "@/stores";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosCheckmark } from "react-icons/io";
import { CategoryBoxProps } from ".";

const CategoryList = ({ categories, setCategories }: CategoryBoxProps) => {
  const { openAlert } = useModalStore(["openAlert"]);

  const list = Object.values(toCategory);
  const selectedList = categories.map((category) => toCategory[category]);

  const handleAddCategory = useCallback(
    (category: string) => {
      if (categories.length >= 5) {
        openAlert({
          title: "카테고리 제한",
          content: "카테고리는 최대 5개까지만 추가 가능합니다.",
        });
        return;
      }
      const categoryKey = Object.keys(toCategory).find(
        (value) => toCategory[value] === category
      );
      if (!categoryKey) return;
      setCategories((prev) => {
        return [...prev, Number(categoryKey)];
      });
    },
    [categories.length, openAlert, setCategories]
  );

  return (
    <>
      {list.map((category, index) => {
        return (
          <Flex
            p={4}
            borderRadius={12}
            backgroundColor={"primary.100"}
            fontWeight={"semibold"}
            key={index}
            gap={2}
            boxShadow={selectedList.includes(category) ? "md" : ""}
            transition={"all 0.5s ease"}
          >
            <Text>{category}</Text>
            {selectedList.includes(category) ? (
              <Icon as={IoIosCheckmark} fontSize={20} />
            ) : (
              <Box pt={0.5}>
                <Icon
                  as={GoPlus}
                  _hover={{
                    cursor: "pointer",
                    transform: "scale(1.5)",
                    transition: "all 0.5s ease",
                  }}
                  onClick={() => handleAddCategory(category)}
                />
              </Box>
            )}
          </Flex>
        );
      })}
    </>
  );
};

export default CategoryList;
