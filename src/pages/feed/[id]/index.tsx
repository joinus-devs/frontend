import { useFetch, useGetComment } from "@/apis";
import { CircleImg, InfiniteList } from "@/components";
import { ApiRoutes } from "@/constants";
import { GroupBanner, GroupDescription } from "@/containers";
import GroupFeedComments from "@/containers/group/GroupFeedComments";
import FeedComment from "@/containers/group/GroupFeedComments/Comment";
import { FeedModifyIcon } from "@/containers/group/GroupFeedItem/FeedModifyIcon";
import { LikeCommentCounter } from "@/containers/group/GroupFeedItem/LikeCommentCounter";
import { PostComment } from "@/containers/group/GroupFeedItem/PostComment";
import { Comment, CommentWithPage, Feed, Group, User } from "@/types";
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
  const { data: comments } = useFetch<CommentWithPage>(
    toUrl(ApiRoutes.FeedInComments, { id: feed?.id })
  );

  const { data: me } = useFetch<User>(ApiRoutes.Me);

  return (
    <Flex justify={"center"}>
      <Flex w={{ base: "100%", xl: "1280px" }} direction={"column"} mb={100}>
        <Box shadow={"md"} mb={10} borderRadius={12} overflow={"hidden"}>
          <GroupBanner />
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
              <PostComment type="feed" feedId={feed.id} />
            </>
          )}
        </Box>
        <Box borderTopWidth={"1px"} gap={6} p={8}>
          <InfiniteList<Comment>
            infiniteQueryResult={useGetComment({
              feedId: feed?.id,
              limit: 10,
            })}
            renderItem={FeedComment}
            gap={20}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default FeedDetail;
