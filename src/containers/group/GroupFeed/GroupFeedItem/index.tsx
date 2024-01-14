import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { GroupPidProps } from "@/containers/group/GroupFeed";
import GroupPidComments from "@/containers/group/GroupFeed/GroupFeedComments";
import Image from "next/image";
import { useBgColor } from "@/hooks";
import { Icon } from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";
import { useCallback, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";

interface GroupPidItemProps {
  props: GroupPidProps;
}

export interface pidCommentProps extends userDataProps {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
}

interface userDataProps {
  userName: string;
  userImgSrc: string;
}

export const dummyUserData = {
  id: 1,
  name: "yoonHwi",
  imgSrc: "/noneUserImg.webp",
};

const dummyCommentData: pidCommentProps[] = [
  {
    id: 0,
    postId: 1,
    userId: 1,
    comment: "ㅋㅋ하이용",
    createdAt: "2024-01-14",
    userName: "윤승휘",
    userImgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    postId: 1,
    userId: 4,
    comment:
      "test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.test댓글 입니다.",
    createdAt: "2024-01-14",
    userName: "이승준",
    userImgSrc: "/noneUserImg.webp",
  },
  {
    id: 6,
    postId: 2,
    userId: 7,
    comment: "댓글입니다.",
    createdAt: "2024-01-14",
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
  },
];

export const GroupPidItem = ({ props }: GroupPidItemProps) => {
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
      pt={4}
      pb={2}
    >
      <Flex gap={4} p={4}>
        <Box borderRadius={"50%"} overflow={"hidden"}>
          <Image
            src={dummyUserData.imgSrc}
            alt="userImg"
            width={60}
            height={60}
          />
        </Box>
        <Flex direction={"column"} gap={1} justifyContent={"end"}>
          <Heading size={"md"}>{dummyUserData.name}</Heading>
          <Box opacity={0.7}>1 month ago</Box>
        </Flex>
      </Flex>
      <Box minH={100} p={4} pl={6}>
        <Text fontSize={"lg"}>{props.content}</Text>
      </Box>
      <Flex gap={6} fontSize={18} pl={6}>
        <Flex
          gap={2}
          as={"button"}
          onClick={handleCommentClick}
          fontWeight={"medium"}
        >
          <Icon as={FaRegCommentDots} mt={1} />
          <Text position={"relative"} bottom={0.5}>
            {comments.length}
          </Text>
        </Flex>
        <Flex gap={2} as={"button"} fontWeight={"medium"}>
          <Icon as={IoHeartSharp} mt={1} color={"red"} />
          <Text position={"relative"} bottom={0.5}>
            0
          </Text>
        </Flex>
      </Flex>
      <Flex p={4}>
        <Box borderRadius={"50%"} overflow={"hidden"}>
          <Image
            src={dummyUserData.imgSrc}
            alt="userImg"
            width={50}
            height={50}
          />
        </Box>
        <Input
          placeholder="댓글을 입력하세요."
          borderRadius={12}
          ml={4}
          size={"lg"}
        />
      </Flex>

      {isComment && comments.length ? (
        <GroupPidComments comments={comments} />
      ) : (
        ""
      )}
    </Flex>
  );
};
