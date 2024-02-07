import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { CircleImg } from "@/components";
import { User, Comment as _Comment } from "@/types";
import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatISO } from "@/utils/date";

interface CommentProps {
  comment: _Comment;
}

export const Comment = ({ comment }: CommentProps) => {
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  return (
    <Flex gap={4} position={"relative"}>
      {me?.id === comment.user_id && (
        <Box as="button" top={4} right={4} position={"absolute"}>
          <Icon as={BsThreeDotsVertical} fontSize={20} />
        </Box>
      )}
      <CircleImg imgSrc={"/noneUserImg.webp"} alt={`comment_user`} size={12} />
      <Flex direction={"column"} gap={1}>
        <Flex gap={2}>
          <Text fontWeight={"bold"}>{comment.user?.name}</Text>
          <Text opacity={0.7}>{formatISO(comment.created_at)}</Text>
        </Flex>
        <Text>{comment.content}</Text>
      </Flex>
    </Flex>
  );
};
