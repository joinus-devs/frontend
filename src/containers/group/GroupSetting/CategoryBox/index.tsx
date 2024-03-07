import { Flex, FormControl, Td, Text, Th, Tr } from "@chakra-ui/react";
import SelectedCategories from "./SelectedCategory";
import CategoryList from "./CategoryList";

export interface CategoryBoxProps {
  categories: number[];
  setCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const CategoryBox = ({ categories, setCategories }: CategoryBoxProps) => {
  return (
    <Tr>
      <Th width={"15%"} fontSize={16} verticalAlign={"top"} pt={8}>
        Category
      </Th>
      <Td>
        <FormControl
          as={Flex}
          gap={8}
          boxShadow={"lg"}
          p={4}
          direction={"column"}
        >
          <Flex
            gap={4}
            p={4}
            bgColor={"gray.100"}
            wrap={"wrap"}
            borderRadius={12}
            boxShadow={"lg"}
          >
            <SelectedCategories
              categories={categories}
              setCategories={setCategories}
            />
          </Flex>
          <Flex direction={"column"} gap={2}>
            <Text fontStyle="italic" opacity={0.8} p={2}>
              카테고리를 골라보세요!
            </Text>
            <Flex
              gap={4}
              wrap={"wrap"}
              p={4}
              bgColor={"gray.100"}
              borderRadius={12}
              boxShadow={"lg"}
            >
              <CategoryList
                categories={categories}
                setCategories={setCategories}
              />
            </Flex>
          </Flex>
        </FormControl>
      </Td>
    </Tr>
  );
};

export default CategoryBox;
