import { Box, Flex } from "@chakra-ui/react";
import { GroupPidItem } from "./GroupFeedItem";

export interface GroupPidProps {
  id: number;
  groupId: number;
  userId: number;
  content: string;
  createdAt: string;
}

const dummyData: GroupPidProps[] = [
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
      <Flex direction={"column"} gap={4} p={4}>
        {dummyData.map((data, index) => (
          <GroupPidItem props={data} key={`pid_${index}`} />
        ))}
      </Flex>
    </Box>
  );
};
export default GroupFeed;
