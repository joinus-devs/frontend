import { useFetch, usePost } from "@/apis";
import { CircleImg } from "@/components";
import InputWithButton from "@/components/common/InputWithButton";
import { ApiRoutes } from "@/constants";
import GroupFeedComments from "@/containers/group/GroupFeed/GroupFeedComments";
import { useBgColor } from "@/hooks";
import { FeedInGroup, User } from "@/types";
import { toUrl } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { LikeCommentCounter } from "./LikeCommentCounter";
import { FeedModifyIcon } from "./FeedModifyIcon";
import { useQueryClient } from "@tanstack/react-query";
import { formatISO } from "@/utils/date";

interface GroupFeedItemProps {
  feed: FeedInGroup;
  groupId?: number;
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

export const GroupFeedItem = ({ feed, groupId }: GroupFeedItemProps) => {
  const [isComment, setIsComment] = useState(false);
  const queryClient = useQueryClient();
  const { data: me } = useFetch<User>(ApiRoutes.Me);
  const { mutate: postComment } = usePost(
    toUrl(ApiRoutes.Comments, { id: feed.id })
  );

  const { register, handleSubmit } = useForm<PostComment>({
    defaultValues: initialFormValues,
  });

  const comments = feed.comments;
  const bgColor = useBgColor();

  const handleCommentClick = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  const handleSubmitComment = useCallback(
    (data: PostComment) => {
      postComment(data, {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.GroupFeed, { id: groupId })],
          }),
      });
    },
    [groupId, postComment, queryClient]
  );

  return (
    <Flex
      direction={"column"}
      backgroundColor={bgColor}
      borderRadius={12}
      shadow={"md"}
      pb={2}
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
      <Flex minH={100} p={4} pl={6} direction={"column"} gap={4}>
        <Heading size={"md"}>{feed.title}</Heading>
        <Text fontSize={"lg"}>{feed.content}</Text>
      </Flex>
      <LikeCommentCounter
        commentCount={comments.length}
        likeCount={0}
        handleCommentClick={handleCommentClick}
      />
      <Flex p={4} gap={2} alignItems={"center"}>
        <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={14} />
        <Flex
          as={"form"}
          position={"relative"}
          w={"100%"}
          onSubmit={handleSubmit(handleSubmitComment)}
        >
          <Input
            placeholder={"댓글을 입력하세요"}
            size="lg"
            h={16}
            ml={4}
            {...register("content")}
          />
          <Button
            type="submit"
            position={"absolute"}
            fontWeight={"bold"}
            m={2}
            w={12}
            h={12}
            zIndex={1}
            right={0}
          >
            <Icon as={FaCheck} />
          </Button>
        </Flex>
      </Flex>

      {isComment && comments.length ? (
        <GroupFeedComments comments={comments} />
      ) : (
        ""
      )}
    </Flex>
  );
};
