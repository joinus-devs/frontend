import { Flex } from "@chakra-ui/react";
import { pidCommentProps } from "../GroupPid";
import Comment from "./Comment";
interface GroupPidCommentsProps {
  comments: pidCommentProps[];
}

const GroupPidComments = ({ comments }: GroupPidCommentsProps) => {
  return (
    <Flex direction={"column"} borderTopWidth={"1px"} gap={4} p={4}>
      {comments.map((v, i) => {
        return <Comment comment={v} key={`pidcomment_${i}`} />;
      })}
    </Flex>
  );
};

export default GroupPidComments;
