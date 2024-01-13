import { Flex } from "@chakra-ui/react";
import { pidCommentProps } from "../../GroupPid";
import { Key } from "react";

interface CommentProps {
  comment: pidCommentProps;
}

const dummyUserData = [
  {
    id: 1,
    name: "윤승휘",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 2,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    name: "이승준",
    imgSrc: "/noneUserImg.webp",
  },
];

const Comment = ({ comment }: CommentProps) => {
  // pidComment의 userId를 통해 user의 정보를 가져옵니다.
  const user = dummyUserData.find((v) => v.id === comment.userId);
  return <Flex>{comment.comment}</Flex>;
};

export default Comment;
