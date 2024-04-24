import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { HotGroupItem } from ".";
import { useGetGroup } from "@/apis";

const HotGroup = () => {
  const { data: group1 } = useGetGroup(31);
  const { data: group2 } = useGetGroup(1);

  const concatData = [];
  if (group1) concatData.push(group1);
  if (group2) concatData.push(group2);

  return (
    <Flex gap={8} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>인기 모임에 가입해보세요 </Heading>
      </Flex>
      {concatData.map((group, index) => {
        return <HotGroupItem key={index} data={group} />;
      })}
    </Flex>
  );
};

export default HotGroup;
