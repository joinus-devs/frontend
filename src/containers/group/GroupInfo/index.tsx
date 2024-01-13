import { GroupDetailProps } from "@/pages/group/[id]";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import GroupPid from "../GroupPid";
import WithLabel from "@/components/common/WithTitle";

export interface GroupPidProps {
  id: number;
  groupId: number;
  userId: number;
  content: string;
  createdAt: string;
}
//임시로 만든 groupPid의 interface입니다.

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
  {
    id: 2,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 3,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    groupId: 1,
    userId: 3,
    content: "안녕하세요",
    createdAt: "2024-01-13",
  },
];

const GroupInfo = ({ group }: GroupDetailProps) => {
  //해당그룹의 pid를 여기서 호출함. (group의 id로)
  //임시로 dummy data를 사용.

  return (
    <Flex direction={"column"} gap={8} w={"100%"} minH={1400} mt={8} mb={8}>
      <Box
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
            backgroundColor={"primary.100"}
          >
            <Heading
              size={"lg"}
              color={"white"}
              backgroundColor={"primary.500"}
              p={4}
            >
              Group Info
            </Heading>
            <Flex direction={"column"} fontSize={20} p={4} gap={4}>
              <WithLabel label="장르" value={group.category} />
              <WithLabel label="그룹명" value={group.name} />
              <WithLabel label="소개" value={group.description} />
            </Flex>
          </Box>
          <Box
            flex={2}
            borderRadius={12}
            overflow={"hidden"}
            backgroundColor={"primary.100"}
          >
            <Heading
              size={"lg"}
              p={4}
              color={"white"}
              backgroundColor={"primary.500"}
            >
              Chat
            </Heading>
          </Box>
        </Flex>
        <Box
          flex={2}
          borderRadius={12}
          backgroundColor={"primary.100"}
          overflow={"hidden"}
        >
          <Heading
            size={"lg"}
            mb={4}
            p={4}
            color={"white"}
            backgroundColor={"primary.500"}
          >
            Group Pid
          </Heading>
          <Flex
            direction={"column"}
            gap={4}
            pl={4}
            pr={4}
            maxH={1000}
            overflowY={"scroll"}
            sx={{
              "::-webkit-scrollbar": {
                width: "8px",
              },
              "::-webkit-scrollbar-thumb": {
                borderRadius: "8px",
                backgroundColor: "primary.500",
              },
            }}
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
