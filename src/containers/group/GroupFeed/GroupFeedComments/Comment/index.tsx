import { Box, Flex, Text } from "@chakra-ui/react";
import { pidCommentProps } from "../../GroupFeedItem";
import Image from "next/image";

interface CommentProps {
  comment: pidCommentProps;
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <Flex gap={4}>
      <Box w={50} h={50} minW={50} borderRadius={"50%"} overflow={"hidden"}>
        <Image
          src={comment.userImgSrc}
          width={50}
          height={50}
          alt={`comment_user_${comment.id}`}
        />
      </Box>
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
