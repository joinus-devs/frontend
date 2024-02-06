import { CircleImg } from "@/components";
import InputWithButton from "@/components/common/InputWithButton";
import GroupFeedComments from "@/containers/group/GroupFeed/GroupFeedComments";
import { useBgColor } from "@/hooks";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LikeCommentCounter } from "./LikeCommentCounter";
import { ModifyIcon } from "./ModifyIcon";
import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Feed, User } from "@/types";

interface GroupFeedItemProps {
  feed: Feed;
  groupId?: number;
}

export interface FeedCommentProps extends UserDataProps {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
}

interface UserDataProps {
  userName: string;
  userImgSrc: string;
}

export const dummyUserData = {
  id: 1,
  name: "yoonHwi",
  imgSrc: "/noneUserImg.webp",
};

const dummyCommentData: FeedCommentProps[] = [
  {
    id: 0,
    postId: 1,
    userId: 1,
    comment: "ㅋㅋ하이용",
    createdAt: "2024-01-14",
    userName: "윤승휘",
    userImgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    postId: 1,
    userId: 4,
    comment:
      "test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.",
    createdAt: "2024-01-14",
    userName: "이승준",
    userImgSrc: "/noneUserImg.webp",
  },
  {
    id: 6,
    postId: 2,
    userId: 7,
    comment: "댓글입니다.",
    createdAt: "2024-01-14",
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
  },
];

export const GroupFeedItem = ({ feed, groupId }: GroupFeedItemProps) => {
  const [isComment, setIsComment] = useState(false);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const bgColor = useBgColor();
  const comments = dummyCommentData.filter((v) => v.postId === feed.id);

  const handleCommentClick = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  const handleSubmitComment = useCallback(() => {}, []);

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
          <ModifyIcon feed={feed} groupId={groupId} />
        )}
        <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={16} />
        <Flex direction={"column"} gap={1} justifyContent={"end"}>
          <Heading size={"md"}>{feed?.user?.name}</Heading>
          <Box opacity={0.7}>1 month ago</Box>
        </Flex>
      </Flex>
      <Box minH={100} p={4} pl={6}>
        <Text fontSize={"lg"}>{feed.content}</Text>
      </Box>
      <LikeCommentCounter
        commentCount={comments.length}
        likeCount={0}
        handleCommentClick={handleCommentClick}
      />
      <Flex p={4} gap={2} alignItems={"center"}>
        <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={14} />
        <InputWithButton
          placeholder="댓글을 입력하세요."
          hanldeSubmit={handleSubmitComment}
          icon={FaCheck}
          boxStyle={{ position: "relative", width: "100%" }}
          buttonStyle={{ right: 0 }}
          inputStyle={{ marginLeft: 4 }}
        />
      </Flex>

      {isComment && comments.length ? (
        <GroupFeedComments comments={comments} />
      ) : (
        ""
      )}
    </Flex>
  );
};
