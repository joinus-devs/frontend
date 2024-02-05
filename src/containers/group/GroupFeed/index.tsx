import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed } from "@/containers";
import { Feed, Group } from "@/types";
import { toUrl } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "./GroupFeedItem";

interface CreateProp {
  onCreateFeed: boolean;
  group: Group;
  setOnCreateFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupFeed = ({ onCreateFeed, group, setOnCreateFeed }: CreateProp) => {
  const { data: feeds } = useFetch<Feed[]>(
    toUrl(ApiRoutes.GroupFeed, { id: group.id })
  );

  return (
    <Box>
      {onCreateFeed ? (
        <Box p={8}>
          <CreateFeed />
        </Box>
      ) : (
        <Flex direction={"column"} gap={4} p={4} pb={8}>
          {feeds?.map((feed, index) => (
            <GroupFeedItem
              feed={feed}
              key={`feed_${index}`}
              groupId={group.id}
              setOnCreateFeed={setOnCreateFeed}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};
export default GroupFeed;
