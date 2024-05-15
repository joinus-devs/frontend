import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface CardTextProps {
  icon: IconType;
  text: string;
}

const CardText = ({ icon, text }: CardTextProps) => {
  return (
    <Flex alignItems={"center"} gap={2}>
      <Icon as={icon} w={"6"} h={"6"} />
      <Text>{text}</Text>
    </Flex>
  );
};

export default CardText;
