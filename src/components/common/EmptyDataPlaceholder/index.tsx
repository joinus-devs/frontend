import { Flex, Text, Icon } from "@chakra-ui/react";
import { HiOutlineBellAlert } from "react-icons/hi2";

interface EmptyDataPlaceholderProps {
  message: string;
}
const EmptyDataPlaceholder = ({ message }: EmptyDataPlaceholderProps) => {
  return (
    <Flex direction={"column"} alignItems={"center"} my={50} gap={8}>
      <Icon as={HiOutlineBellAlert} w={16} h={16} color={"gray.400"} />
      <Text pl={6} fontWeight={"semibold"} fontStyle={"italic"}>
        {message}
      </Text>
    </Flex>
  );
};

export default EmptyDataPlaceholder;
