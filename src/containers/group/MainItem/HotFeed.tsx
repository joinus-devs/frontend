import { useGetFeed } from "@/apis";
import { NewFeedItem } from "@/containers/feed";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const HotFeed = () => {
  const { data: feed1 } = useGetFeed(3);
  const { data: feed2 } = useGetFeed(4);
  const concatData = [];
  if (feed1) concatData.push(feed1);
  if (feed2) concatData.push(feed2);

  return (
    <Flex gap={8} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>급상승 중인 피드에요</Heading>
      </Flex>
      {concatData.map((feed, index) => {
        return <NewFeedItem key={index} data={feed} />;
      })}
    </Flex>
  );
};

export default HotFeed;
