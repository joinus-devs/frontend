import { Flex, Text } from "@chakra-ui/react";
import { FeedCommentProps } from "../../GroupFeedItem";
import { CircleImg } from "@/components";

interface CommentProps {
  comment: FeedCommentProps;
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <Flex gap={4}>
      <CircleImg imgSrc={comment.userImgSrc} alt={`comment_user`} size={12} />
      <Flex direction={"column"} gap={1}>
        <Flex gap={2}>
          <Text fontWeight={"bold"}>{comment.userName}</Text>
          <Text opacity={0.7}>1day ago</Text>
        </Flex>
        <Text>{comment.comment}</Text>
      </Flex>
    </Flex>
  );
};
