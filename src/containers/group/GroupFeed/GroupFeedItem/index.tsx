import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { GroupFeedProps } from "@/containers/group/GroupFeed";
import GroupFeedComments from "@/containers/group/GroupFeed/GroupFeedComments";
import { useBgColor } from "@/hooks";
import { Icon } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useCallback, useState } from "react";
import { CircleImg } from "@/components";
import { LikeCommentCounter } from "./LikeCommentCounter";
import InputWithButton from "@/components/common/InputWithButton";

interface GroupFeedItemProps {
  props: GroupFeedProps;
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

export const GroupFeedItem = ({ props }: GroupFeedItemProps) => {
  const [isComment, setIsComment] = useState(false);
  //props의 GroupFeed 의 userId를 통해 user의 정보를 가져옵니다.

  const bgColor = useBgColor();
  const comments = dummyCommentData.filter((v) => v.postId === props.id);

  const handleCommentClick = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  const handleSubmitComment = useCallback(() => {}, []);
  return (
    <Flex
      direction={"column"}
      backgroundColor={bgColor}
      borderRadius={12}
      shadow={"lg"}
      pt={4}
      pb={2}
    >
      <Flex gap={4} p={4}>
        <CircleImg imgSrc={dummyUserData.imgSrc} alt="userImg" size={60} />
        <Flex direction={"column"} gap={1} justifyContent={"end"}>
          <Heading size={"md"}>{dummyUserData.name}</Heading>
          <Box opacity={0.7}>1 month ago</Box>
        </Flex>
      </Flex>
      <Box minH={100} p={4} pl={6}>
        <Text fontSize={"lg"}>{props.content}</Text>
      </Box>
      <LikeCommentCounter
        commentCount={comments.length}
        likeCount={0}
        handleCommentClick={handleCommentClick}
      />
      <Flex p={4} gap={2}>
        <CircleImg
          imgSrc={dummyUserData.imgSrc}
          alt="userImg"
          size={60}
          style={{ width: 60, height: 60, minWidth: 60 }}
        />
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
