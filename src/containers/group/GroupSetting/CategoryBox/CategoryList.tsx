import { toCategory } from "@/constants";
import { useModalStore } from "@/stores";
import { HStack, Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosCheckmark } from "react-icons/io";
import { CategoryBoxProps } from ".";

const list = Object.values(toCategory);

const CategoryList = ({ categories, setCategories }: CategoryBoxProps) => {
  const { openAlert } = useModalStore(["openAlert"]);

  const selectedList = useMemo(
    () => categories?.map((category) => toCategory[category]) ?? [],
    [categories]
  );

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
    [categories?.length, openAlert, setCategories]
  );

  return (
    <>
      {list.map((category, index) => {
        return (
          <HStack spacing={4} key={`tag_${index}`}>
            <Tag
              size={"lg"}
              borderRadius="full"
              variant="solid"
              bgColor={"gray.100"}
              color={selectedList.includes(category) ? "primary.500" : "black"}
              fontWeight={
                selectedList.includes(category) ? "semibold" : "normal"
              }
            >
              <TagLabel>{category}</TagLabel>
              {selectedList.includes(category) ? (
                <TagRightIcon as={IoIosCheckmark} fontSize={20} />
              ) : (
                <TagRightIcon
                  as={GoPlus}
                  _hover={{
                    cursor: "pointer",
                    transform: "scale(1.5)",
                    transition: "all 0.5s ease",
                  }}
                  onClick={() => handleAddCategory(category)}
                />
              )}
            </Tag>
          </HStack>
        );
      })}
    </>
  );
};

export default CategoryList;
