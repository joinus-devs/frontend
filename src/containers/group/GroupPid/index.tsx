import { Box, Container, Flex } from "@chakra-ui/react";
import { GroupPidProps } from "../GroupInfo";
import Image from "next/image";

interface GroupPidArrayProps {
  props: GroupPidProps;
}

const dummyUserData = {
  id: 1,
  name: "윤승휘",
  imgSrc: "/noneUserImg.webp",
};

const GroupPid = ({ props }: GroupPidArrayProps) => {
  //props의 userId를 통해 user의 정보를 가져옵니다.
  return (
    <Flex
      direction={"column"}
      backgroundColor={"white"}
      borderRadius={12}
      overflow={"hidden"}
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
        <Box
          flex={1}
          textAlign={"center"}
          fontWeight={"bold"}
          borderRightWidth={"1px"}
          p={4}
        >
          Comment
        </Box>
        <Box flex={1} textAlign={"center"} fontWeight={"bold"} p={4}>
          Like
        </Box>
      </Flex>
    </Flex>
  );
};
export default GroupPid;
