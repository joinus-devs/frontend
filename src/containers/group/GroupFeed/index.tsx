import { Box, Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "./GroupFeedItem";

export interface GroupFeedProps {
  id: number;
  groupId: number;
  userId: number;
  content: string;
  createdAt: string;
}

export const dummyData: GroupFeedProps[] = [
  {
    id: 0,
    groupId: 1,
    userId: 1,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 1,
    groupId: 1,
    userId: 2,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 2,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 3,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
];

const GroupFeed = () => {
  return (
    <Box>
      <Flex direction={"column"} gap={4} p={4} pb={8}>
        {dummyData.map((data, index) => (
          <GroupFeedItem props={data} key={`feed_${index}`} />
        ))}
      </Flex>
    </Box>
  );
};
export default GroupFeed;
