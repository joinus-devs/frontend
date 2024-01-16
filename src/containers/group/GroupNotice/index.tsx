import { Box, Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "../GroupFeed/GroupFeedItem";

const dummyNoticeData = [
  {
    id: 10,
    groupId: 1,
    userId: 1,
    content: "공지사항입니다.",
    createdAt: "2024-01-13",
  },
  {
    id: 11,
    groupId: 1,
    userId: 2,
    content: "공지사항입니다",
    createdAt: "2024-01-13",
  },
];

const GroupNotice = () => {
  //GroupFeedItem을 재활용해서 사용할 수 있을 것 같음.
  //type을 분류해서 사용하면 될 것 같음.
  return (
    <Box>
      <Flex direction={"column"} gap={4} p={4}>
        {dummyNoticeData.map((data, index) => (
          <GroupFeedItem props={data} key={`feed_${index}`} />
        ))}
      </Flex>
    </Box>
  );
};
export default GroupNotice;
