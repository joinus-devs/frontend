import { useFetch, useGetComment } from "@/apis";
import { CircleImg } from "@/components";
import { WindowVirtualList } from "@/components/common/DynamicInfiniteList";
import { ApiRoutes } from "@/constants";
import { GroupDescription } from "@/containers";
import FeedComment from "@/containers/group/GroupFeedComments/Comment";
import { FeedModifyIcon } from "@/containers/group/GroupFeedItem/FeedModifyIcon";
import { LikeCommentCounter } from "@/containers/group/GroupFeedItem/LikeCommentCounter";
import { CommentForm } from "@/containers/group/GroupFeedItem/CommentForm";
import { Comment, Feed, Group, User } from "@/types";
import { toUrl } from "@/utils";
import { formatISO } from "@/utils/date";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const FeedDetail = () => {
  const router = useRouter();
  const numberingQuery = Number(router.query.id);
  const { data: feed } = useFetch<Feed>(
    toUrl(ApiRoutes.Feeds, { id: numberingQuery })
  );

  const { data: group } = useFetch<Group>(
    toUrl(ApiRoutes.Group, { id: feed?.club_id })
  );

  const { data: me } = useFetch<User>(ApiRoutes.Me);

  return (
    <Flex justify={"center"}>
      <Flex w={{ base: "100%", xl: "1280px" }} direction={"column"} mb={100}>
        <Box shadow={"md"} mb={10} borderRadius={12} overflow={"hidden"}>
          <GroupDescription group={group} />
        </Box>
        <Box position={"relative"}>
          <Flex gap={4} p={4}>
            {me?.id === feed?.user_id && feed && <FeedModifyIcon feed={feed} />}
            <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={16} />
            <Flex direction={"column"} gap={1} justifyContent={"end"}>
              <Heading size={"md"}>{feed?.user.name}</Heading>
              <Text opacity={0.7}>{formatISO(feed?.created_at)}</Text>
            </Flex>
          </Flex>
          <Flex p={4} pl={6} direction={"column"} gap={4}>
            <Heading size={"md"}>{feed?.title}</Heading>
            <Text fontSize={"lg"} id="text">
              {feed?.content}
            </Text>
          </Flex>
          {feed && (
            <>
              <LikeCommentCounter
                commentCount={feed.comment_count}
                likeCount={0}
              />
              <CommentForm type="feed" feedId={feed.id} />
            </>
          )}
        </Box>
        <Box borderTopWidth={"1px"} p={8}>
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
    </Flex>
  );
};

export default FeedDetail;
