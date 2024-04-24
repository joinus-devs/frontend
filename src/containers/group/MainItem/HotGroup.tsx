import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const HotGroup = () => {
  return (
    <Flex gap={2} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>인기 모임에 가입해보세요 </Heading>
      </Flex>
    </Flex>
  );
};

export default HotGroup;
