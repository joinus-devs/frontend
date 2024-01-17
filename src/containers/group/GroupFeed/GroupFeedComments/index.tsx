import { Flex } from "@chakra-ui/react";
import { FeedCommentProps } from "../GroupFeedItem";
import { Comment } from "./Comment";
interface GroupFeedCommentsProps {
  comments: FeedCommentProps[];
}

const GroupFeedComments = ({ comments }: GroupFeedCommentsProps) => {
  return (
    <Flex direction={"column"} borderTopWidth={"1px"} gap={6} p={8}>
      {comments.map((v, i) => {
        return <Comment comment={v} key={`feedcomment_${i}`} />;
      })}
    </Flex>
  );
};

export default GroupFeedComments;
