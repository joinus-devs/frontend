import { GroupDetailProps } from "@/pages/group/[id]";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import GroupPid from "./GroupPid";

export interface GroupPidProps {
  id: number;
  groupId: number;
  userId: number;
  content: string;
  createdAt: string;
}
//임시로 만든 groupPid의 interface입니다.

const GroupInfo = ({ group }: GroupDetailProps) => {
  //해당그룹의 pid를 여기서 호출함. (group의 id로)
  //임시로 dummy data를 사용.
  const dummyData: GroupPidProps[] = [
    {
      id: 0,
      groupId: 1,
      userId: 1,
      content: "안녕하세요",
      createdAt: "2024-01-13",
    },
    {
      id: 1,
      groupId: 1,
      userId: 2,
      content: "안녕하세요",
      createdAt: "2024-01-13",
    },
    // +
  ];
  return (
    <Flex direction={"column"} gap={8} w={"100%"} minH={1400} mt={8} mb={8}>
      <Box
        backgroundColor={"green.400"}
        w={"100%"}
        h={300}
        overflow={"hidden"}
        position={"relative"}
        shadow={"lg"}
      >
        <Image
          src={group.imgSrc}
          alt="groupImg"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Flex gap={8} flex={1}>
        <Flex direction={"column"} gap={8} flex={1}>
          <Box
            flex={1}
            borderRadius={12}
            overflow={"hidden"}
            backgroundColor={"green.50"}
          >
            <Heading
              size={"lg"}
              color={"white"}
              backgroundColor={"green.500"}
              p={4}
            >
              Group Info
            </Heading>
            <Flex direction={"column"} fontSize={20} p={4}>
              <Box>장르 : {group.category}</Box>
              <Box>그룹명 : {group.name}</Box>
              <Box mt={4}>그룹소개</Box>
              <Box>{group.description}</Box>
            </Flex>
          </Box>
          <Box
            flex={2}
            borderRadius={12}
            overflow={"hidden"}
            backgroundColor={"green.50"}
          >
            <Heading
              size={"lg"}
              p={4}
              color={"white"}
              backgroundColor={"green.500"}
            >
              Chat
            </Heading>
          </Box>
        </Flex>
        <Box
          flex={2}
          borderRadius={12}
          backgroundColor={"green.50"}
          overflow={"hidden"}
        >
          <Heading
            size={"lg"}
            mb={4}
            p={4}
            color={"white"}
            backgroundColor={"green.500"}
          >
            Group Pid
          </Heading>
          <Flex
            direction={"column"}
            gap={4}
            pl={4}
            pr={4}
            overflowY={"auto"}
            maxH={1000}
          >
            {dummyData.map((data, index) => (
              <GroupPid props={data} key={`pid_${index}`} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GroupInfo;
