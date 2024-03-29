import { Flex } from "@chakra-ui/react";
import FeedComment from "./Comment";
import { Comment as _Comment } from "@/types";
interface GroupFeedCommentsProps {
  comments: _Comment[];
}

const GroupFeedComments = ({ comments }: GroupFeedCommentsProps) => {
  return (
    <Flex direction={"column"} borderTopWidth={"1px"} gap={6} p={8}>
      {comments.map((v, i) => {
        return <FeedComment data={v} key={`feedcomment_${i}`} />;
      })}
    </Flex>
  );
};

export default GroupFeedComments;
