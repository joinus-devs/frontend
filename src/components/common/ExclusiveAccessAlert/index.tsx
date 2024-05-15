import { Flex, Icon, Heading } from "@chakra-ui/react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface ExclusiveAccessAlertProps {
  text: string;
}

const ExclusiveAccessAlert = ({ text }: ExclusiveAccessAlertProps) => {
  return (
    <Flex direction={"column"} alignItems={"center"} gap={4} pt={4}>
      <Icon as={IoAlertCircleOutline} h={"16"} w={"16"} color={"yellow.500"} />
      <Heading size={"md"}>{text}</Heading>
    </Flex>
  );
};

export default ExclusiveAccessAlert;
