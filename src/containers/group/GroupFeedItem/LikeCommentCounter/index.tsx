import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoHeartSharp } from "react-icons/io5";

interface LikeCommentCounterProps {
  commentCount: number;
  likeCount: number;
  handleCommentClick?: () => void;
}

export const LikeCommentCounter = ({
  commentCount,
  likeCount,
  handleCommentClick,
}: LikeCommentCounterProps) => {
  return (
    <Flex gap={6} fontSize={18} pl={2}>
      <Flex
        gap={2}
        as={"button"}
        onClick={handleCommentClick}
        fontWeight={"medium"}
        align={"center"}
      >
        <Icon as={FaRegCommentDots} />
        <Text position={"relative"}>{commentCount}</Text>
      </Flex>
      <Flex gap={2} as={"button"} fontWeight={"medium"} align={"center"}>
        <Icon as={IoHeartSharp} color={"red"} />
        <Text position={"relative"}>{likeCount}</Text>
      </Flex>
    </Flex>
  );
};
