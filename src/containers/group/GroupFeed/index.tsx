import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed } from "@/containers";
import { Feed, Group } from "@/types";
import { toUrl } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "./GroupFeedItem";

interface CreateProp {
  feeds: Feed[];
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
