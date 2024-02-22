import { _useFetch, useFetch, usePost } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes, PageRoutes } from "@/constants";
import GroupFeedComments from "@/containers/group/GroupFeedComments";
import { useBgColor } from "@/hooks";
import { CommentWithPage, Feed, User } from "@/types";
import { toUrl } from "@/utils";
import { formatISO } from "@/utils/date";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FeedModifyIcon } from "./FeedModifyIcon";
import { LikeCommentCounter } from "./LikeCommentCounter";
import { PostComment } from "./PostComment";
import { useRouter } from "next/router";

interface GroupFeedItemProps {
  data: Feed;
}

export interface PostComment {
  content: string;
}

export const dummyUserData = {
  id: 1,
  name: "yoonHwi",
  imgSrc: "/noneUserImg.webp",
};

const maxBodyHeight = 200;

const GroupFeedItem = ({ data }: GroupFeedItemProps) => {
  const [isComment, setIsComment] = useState(false);
  const [moreContent, setMoreContent] = useState(false);

  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const { data: comments, refetch: fetchComment } = _useFetch<CommentWithPage>(
    toUrl(ApiRoutes.FeedInComments, { id: data.id }),
    undefined
  );

  const bgColor = useBgColor();

  const routerPushHandler = useCallback(() => {
    router.push(toUrl(PageRoutes.Feed, { id: data.id }));
  }, [data.id, router]);

  useEffect(() => {
    if (bodyRef.current) {
      const contentHeight = bodyRef.current.offsetHeight;
      if (contentHeight > maxBodyHeight) {
        setMoreContent(true);
        bodyRef.current.style.overflow = "hidden";
        bodyRef.current.style.maxHeight = `${maxBodyHeight}px`;
      }
    }
  }, [bodyRef, data.content]);

  return (
    <>
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
          {me?.id === data.user_id && <FeedModifyIcon feed={data} />}
          <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={16} />
          <Flex direction={"column"} gap={1} justifyContent={"end"}>
            <Heading size={"md"}>{data.user?.name}</Heading>
            <Box opacity={0.7}>{formatISO(data.created_at)}</Box>
          </Flex>
        </Flex>
        <Flex p={4} pl={6} direction={"column"} gap={4} minH={273} maxH={273}>
          <Box ref={bodyRef}>
            <Heading size={"md"}>{data.title}</Heading>
            <Text fontSize={"lg"} id="text">
              {data.content}
            </Text>
          </Box>
        </Flex>
        <Box position={"relative"}>
          {moreContent && (
            <Box position={"absolute"} top={-10} opacity={0.8} right={"50%"}>
              <Button p={2} onClick={() => routerPushHandler()}>
                더보기
              </Button>
            </Box>
          )}
        </Box>
        <LikeCommentCounter
          commentCount={data.comment_count}
          likeCount={0}
          handleCommentClick={routerPushHandler}
        />
        <PostComment type="group" feedId={data.id} />
      </Flex>
    </>
  );
};

export default GroupFeedItem;
