import { CircleImg } from "@/components";
import InputWithButton from "@/components/common/InputWithButton";
import { Group } from "@/types";
import { Box, Collapse, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { ChatPanel } from "./ChatPanel";
import { OnlineMember } from "./OnlineMember";
import { SetBgImage } from "./SetBgImage";
import { useGetGroupMembers } from "@/apis";

interface GroupChatProps {
  group: Group;
}

export interface ChatLogProps {
  id: number;
  userId: number;
  userName: string;
  userImgSrc: string;
  chat: string;
  createdAt: string;
}

const dummyChatLog: ChatLogProps[] = [
  {
    id: 0,
    userId: 1,
    userName: "윤승휘",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "02:30", //해당 유저가 채팅보낸시간을 통해 현재시간과 비교하는 유틸함수를 통해 시간을 계산해줘야함
  },
  {
    id: 1,
    userId: 2,
    userName: "이승준",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요",
    createdAt: "03:20",
  },
  {
    id: 2,
    userId: 3,
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "04:20",
  },
  {
    id: 3,
    userId: 3,
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요",
    createdAt: "06:30",
  },
  {
    id: 4,
    userId: 3,
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요",
    createdAt: "12:12",
  },
  {
    id: 0,
    userId: 1,
    userName: "윤승휘",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "02:30",
  },
  {
    id: 1,
    userId: 2,
    userName: "이승준",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요",
    createdAt: "03:20",
  },
  {
    id: 2,
    userId: 3,
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "04:20",
  },
  {
    id: 0,
    userId: 1,
    userName: "윤승휘",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "02:30",
  },
  {
    id: 1,
    userId: 2,
    userName: "이승준",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요",
    createdAt: "03:20",
  },
  {
    id: 2,
    userId: 3,
    userName: "김민수",
    userImgSrc: "/noneUserImg.webp",
    chat: "안녕하세요 히요히요히요히요히요히요히요히요히요히요히요히요",
    createdAt: "04:20",
  },
];

const GroupChat = ({ group }: GroupChatProps) => {
  const [bgImg, setBgImg] = useState<number>(0);
  const [viewOnlineMember, setViewOnlineMember] = useState<boolean>(false);
  const { data } = useGetGroupMembers(group.id!);
  const handleSubmit = useCallback(() => {}, []);

  const currentUserId = 1;

  return (
    <Flex gap={6} p={4}>
      <Flex direction={"column"} flex={2} h={"100%"} gap={8}>
        <Flex alignItems={"center"} gap={4} position={"relative"}>
          <Box as="button" position={"absolute"} top={-2} right={0}>
            {viewOnlineMember ? (
              <Icon
                as={MdArrowForwardIos}
                fontSize={24}
                onClick={() => setViewOnlineMember(false)}
              />
            ) : (
              <Icon
                as={BsFillPersonLinesFill}
                fontSize={24}
                onClick={() => setViewOnlineMember(true)}
              />
            )}
          </Box>
          <CircleImg imgSrc={"/none-groupimg.webp"} alt="group_img" size={24} />
          <Flex direction={"column"} gap={2}>
            <Heading size={"lg"} opacity={0.9}>
              {group?.name}
            </Heading>
            <Text opacity={0.6}>{data?.data.length} members</Text>
            <SetBgImage setBgImg={setBgImg} />
          </Flex>
        </Flex>
        <Box h={1200} shadow={"lg"} position={"relative"}>
          <Box opacity={0.5}>
            <Image
              src={`/group_chat${bgImg}.jpg`}
              alt="group_chat"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
          <ChatPanel chatLog={dummyChatLog} currentUserId={currentUserId} />
        </Box>
      </Flex>
      <Box as={Collapse} in={viewOnlineMember} flex={1} animateOpacity>
        <Flex direction={"column"} gap={5}>
          <Heading size={"lg"} opacity={0.9}>
            Messages
          </Heading>
          <InputWithButton
            placeholder="member name"
            hanldeSubmit={handleSubmit}
            icon={IoIosSearch}
            boxStyle={{ position: "relative", alignItems: "center" }}
            buttonStyle={{ fontSize: 28, right: 0 }}
          />
          <OnlineMember group={group} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default GroupChat;
