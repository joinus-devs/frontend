import { Box, Flex } from "@chakra-ui/react";
import { GroupPidProps } from "../GroupInfo";
import Image from "next/image";
import { useBgColor } from "@/hooks";
import { Icon } from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useCallback, useState } from "react";
import GroupPidComments from "../GroupPidComments";

interface GroupPidArrayProps {
  props: GroupPidProps;
}

export interface pidCommentProps {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
}

export const dummyUserData = {
  id: 1,
  name: "윤승휘",
  imgSrc: "/noneUserImg.webp",
};

const dummyCommentData: pidCommentProps[] = [
  {
    id: 0,
    postId: 1,
    userId: 1,
    comment: "ㅋㅋ하이용",
    createdAt: "2024-01-14",
  },
  { id: 4, postId: 1, userId: 4, comment: "test댓글", createdAt: "2024-01-14" },
  {
    id: 6,
    postId: 2,
    userId: 7,
    comment: "댓글입니다.",
    createdAt: "2024-01-14",
  },
];

const GroupPid = ({ props }: GroupPidArrayProps) => {
  const [isComment, setIsComment] = useState(false);
  //props의 GroupPid 의 userId를 통해 user의 정보를 가져옵니다.

  const bgColor = useBgColor();
  const comments = dummyCommentData.filter((v) => v.postId === props.id);

  const handleCommentClick = useCallback(() => {
    setIsComment((prev) => !prev);
  }, []);

  return (
    <Flex
      direction={"column"}
      backgroundColor={bgColor}
      borderRadius={12}
      shadow={"lg"}
    >
      <Flex gap={4} borderBottomWidth={"1px"}>
        <Box borderRadius={"12px 12px 0  0"} overflow={"hidden"}>
          <Image
            src={dummyUserData.imgSrc}
            alt="userImg"
            width={150}
            height={150}
          />
        </Box>
        <Flex direction={"column"} gap={2} justifyContent={"end"} pb={4}>
          <Box>
            {dummyUserData.name} 님의 {props.createdAt} 에
          </Box>
          <Box>작성된 게시글입니다.</Box>
        </Flex>
      </Flex>
      <Box minH={200} p={4}>
        {props.content}
      </Box>
      <Flex fontSize={20} borderTopWidth={"1px"}>
        <Flex
          flex={1}
          borderRightWidth={"1px"}
          p={4}
          gap={4}
          justifyContent={"center"}
          as={"button"}
          fontWeight={"bold"}
          onClick={handleCommentClick}
        >
          <Box>Comment</Box>
          <Icon as={FaRegCommentDots} mt={1} />
        </Flex>
        <Flex
          flex={1}
          fontWeight={"bold"}
          p={4}
          gap={4}
          justifyContent={"center"}
          as={"button"}
        >
          <Box>Like</Box>
          <Icon as={FcLike} mt={1} />
        </Flex>
      </Flex>
      {isComment && comments.length ? (
        <GroupPidComments comments={comments} />
      ) : (
        ""
      )}
    </Flex>
  );
};
export default GroupPid;
