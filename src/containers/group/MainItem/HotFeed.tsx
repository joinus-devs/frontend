import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const HotFeed = () => {
  return (
    <Flex gap={2} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>급상승 중인 피드에요</Heading>
      </Flex>
    </Flex>
  );
};

export default HotFeed;
