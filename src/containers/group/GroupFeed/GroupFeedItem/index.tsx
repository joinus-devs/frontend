import { _useFetch, useFetch, usePost } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import GroupFeedComments from "@/containers/group/GroupFeed/GroupFeedComments";
import { useBgColor } from "@/hooks";
import { Feed, User, Comment, CommentWithPage } from "@/types";
import { toUrl } from "@/utils";
import { formatISO } from "@/utils/date";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { FeedModifyIcon } from "./FeedModifyIcon";
import { LikeCommentCounter } from "./LikeCommentCounter";
import { PostComment } from "./PostComment";

interface GroupFeedItemProps {
  feed: Feed;
  groupId: number;
}

export interface PostComment {
  content: string;
}

export const dummyUserData = {
  id: 1,
  name: "yoonHwi",
  imgSrc: "/noneUserImg.webp",
};

const initialFormValues: PostComment = {
  content: "",
};

const maxBodyHeight = 200;
export const GroupFeedItem = ({ feed, groupId }: GroupFeedItemProps) => {
  const [isComment, setIsComment] = useState(false);
  const [moreContent, setMoreContent] = useState(false);

  const queryClient = useQueryClient();
  const bodyRef = useRef<HTMLDivElement>(null);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const { mutate: postComment } = usePost(
    toUrl(ApiRoutes.FeedInComments, { id: feed.id })
  );

  const { data: comments, refetch: fetchComment } = _useFetch<CommentWithPage>(
    toUrl(ApiRoutes.FeedInComments, { id: feed.id }),
    undefined
  );

  const bgColor = useBgColor();

  const handleCommentClick = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isComment) return;
    fetchComment();
  }, [fetchComment, isComment]);

  useEffect(() => {
    if (bodyRef.current) {
      const contentHeight = bodyRef.current.offsetHeight;
      if (contentHeight > maxBodyHeight) {
        setMoreContent(true);
        bodyRef.current.style.overflow = "hidden";
        bodyRef.current.style.maxHeight = `${maxBodyHeight}px`;
      }
    }
  }, [bodyRef, feed.content]);
  return (
    <Flex
      direction={"column"}
      backgroundColor={bgColor}
      borderRadius={12}
      shadow={"md"}
      pb={2}
      minH={500}
      maxH={500}
    >
      <Flex gap={4} p={4} position={"relative"}>
        {me?.id === feed.user_id && (
          <FeedModifyIcon feed={feed} groupId={groupId} />
        )}
        <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={16} />
        <Flex direction={"column"} gap={1} justifyContent={"end"}>
          <Heading size={"md"}>{feed.user?.name}</Heading>
          <Box opacity={0.7}>{formatISO(feed.created_at)}</Box>
        </Flex>
      </Flex>
      <Flex p={4} pl={6} direction={"column"} gap={4} minH={273} maxH={273}>
        <Box ref={bodyRef}>
          <Heading size={"md"}>{feed.title}</Heading>
          <Text fontSize={"lg"} id="text">
            {feed.content}
          </Text>
        </Box>
      </Flex>
      <Box position={"relative"}>
        {moreContent && (
          <Box position={"absolute"} top={-10} opacity={0.8} right={"50%"}>
            <Button p={2}>더보기</Button>
          </Box>
        )}
      </Box>
      <LikeCommentCounter
        commentCount={feed.comment_count}
        likeCount={0}
        handleCommentClick={handleCommentClick}
      />
      <PostComment groupId={groupId} type="group" feedId={feed.id} />

      {isComment && comments?.data?.length ? (
        <GroupFeedComments comments={comments.data} />
      ) : (
        ""
      )}
    </Flex>
  );
};
