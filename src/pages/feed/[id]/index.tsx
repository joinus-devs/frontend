import { useGetComment, useGetGroup, useGetMe } from "@/apis";
import { useGetFeed } from "@/apis/feed";
import { DefaultLayout } from "@/components";
import { WindowVirtualList } from "@/components/common/DynamicInfiniteList";
import { PageRoutes } from "@/constants";
import { FeedBody, FeedExtra, GroupDescription } from "@/containers";
import FeedComment from "@/containers/group/GroupFeedComments/Comment";
import { Comment } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiArrowGoBackLine } from "react-icons/ri";

const FeedDetail = () => {
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);
  const { data: feed } = useGetFeed(numberingQuery);
  const { data: group } = useGetGroup(feed?.club_id);
  const { data: me } = useGetMe();

  return (
    <DefaultLayout>
      <Flex
        w={{ base: "100%", md: "container.md" }}
        direction={"column"}
        gap={8}
      >
        <Box shadow={"md"} borderRadius={4} overflow={"hidden"}>
          {group && <GroupDescription group={group} />}
        </Box>
        <Flex justifyContent={"end"}>
          <IconButton
            aria-label="route_groupfeed"
            onClick={() =>
              router.push(toUrl(PageRoutes.GroupFeed, { id: feed?.club_id }))
            }
          >
            <Flex gap={1} p={2}>
              <Icon as={RiArrowGoBackLine} w="6" h={"5"} />
              <Text>목록</Text>
            </Flex>
          </IconButton>
        </Flex>
        {feed && (
          <>
            <FeedBody feed={feed} />
            <FeedExtra feed={feed} />
          </>
        )}
        <Box borderTopWidth={"1px"} py={4}>
          <WindowVirtualList<Comment>
            infiniteQueryResult={useGetComment({
              feedId: feed?.id,
              limit: 10,
            })}
            renderItem={FeedComment}
            gap={8}
          />
        </Box>
      </Flex>
    </DefaultLayout>
  );
};

export default FeedDetail;
