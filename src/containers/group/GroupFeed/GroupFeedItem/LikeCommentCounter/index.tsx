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
    <Flex gap={6} fontSize={18} pl={6}>
      <Flex
        gap={2}
        as={"button"}
        onClick={handleCommentClick}
        fontWeight={"medium"}
      >
        <Icon as={FaRegCommentDots} mt={1} />
        <Text position={"relative"} bottom={0.5}>
          {commentCount}
        </Text>
      </Flex>
      <Flex gap={2} as={"button"} fontWeight={"medium"}>
        <Icon as={IoHeartSharp} mt={1} color={"red"} />
        <Text position={"relative"} bottom={0.5}>
          {likeCount}
        </Text>
      </Flex>
    </Flex>
  );
};
