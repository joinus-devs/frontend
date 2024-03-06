import { Flex } from "@chakra-ui/react";
import SelectedCategory from "./SelectedCategory";
import CategoryList from "./CategoryList";

interface CategoryBoxProps {
  categories: string[];
}
const CategoryBox = ({ categories }: CategoryBoxProps) => {
  const dummyCategory = ["1", "2", "3"];
  return (
    <Flex gap={2} boxShadow={"lg"} p={8} direction={"column"}>
      <Flex gap={4}>
        {dummyCategory.map((category, index) => {
          return <SelectedCategory category={category} key={index} />;
        })}
      </Flex>
      <Flex gap={4}>
        <CategoryList />
      </Flex>
    </Flex>
  );
};

export default CategoryBox;
