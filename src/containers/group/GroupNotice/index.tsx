import { Box, Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "../GroupFeedItem";
import { useRouter } from "next/router";
import { useFetch } from "@/apis";
import { FeedWithPage } from "@/types";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

const dummyNoticeData = [
  {
    id: 10,
    club_id: 1,
    user_id: 1,
    title: "공지사항입니다.",
    content: "공지사항입니다.",
    createdAt: "2024-01-13",
    is_private: false,
    comment_count: 0,
  },
  {
    id: 11,
    club_id: 1,
    user_id: 1,
    title: "공지사항입니다.",
    content: "공지사항입니다.",
    createdAt: "2024-01-13",
    is_private: false,
    comment_count: 0,
  },
];

const GroupNotice = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: feeds, isSuccess } = useFetch<FeedWithPage>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId })
  );

  //GroupFeedItem을 재활용해서 사용할 수 있을 것 같음.
  //type을 분류해서 사용하면 될 것 같음.
  return (
    <Box>
      <Flex direction={"column"} gap={4} p={4}>
        {feeds?.data.map((feed, index) => (
          <GroupFeedItem feed={feed} key={`feed_${index}`} />
        ))}
      </Flex>
    </Box>
  );
};
export default GroupNotice;
