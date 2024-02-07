import { FeedInGroup } from "@/types";
import { Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "./GroupFeedItem";

interface CreateProp {
  feeds: FeedInGroup[];
  groupId: number;
}

const GroupFeed = ({ feeds, groupId }: CreateProp) => {
  return (
    <Flex direction={"column"} gap={4} p={4} pb={8}>
      {feeds?.map((feed, index) => (
        <GroupFeedItem feed={feed} key={`feed_${index}`} groupId={groupId} />
      ))}
    </Flex>
  );
};
export default GroupFeed;
