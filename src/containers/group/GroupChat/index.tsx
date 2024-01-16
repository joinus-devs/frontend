import { GroupProps } from "@/pages/group/[id]";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { OnlineMember } from "./OnlineMember";
import { ChatPanel } from "./ChatPanel";
import { useCallback, useState } from "react";
import { CircleImg } from "@/components";
import { SetBgImage } from "./SetBgImage";
import { IoIosSearch } from "react-icons/io";
import InputWithButton from "@/components/common/InputWithButton";

interface GroupChatProps {
  group: GroupProps;
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

  const handleSubmit = useCallback(() => {}, []);

  const currentUserId = 1;
  //현재 로그인한 유저의 아이디를 가져와서 해당 아이디와 채팅방에 있는 유저의 아이디를 비교해서
  //같으면 오른쪽에 채팅을 띄워주고 다르면 왼쪽에 채팅을 띄워줘야함
  return (
    <Flex gap={6} p={4}>
      <Flex direction={"column"} flex={2} h={"100%"} gap={8}>
        <Flex alignItems={"center"} gap={4} position={"relative"}>
          <CircleImg imgSrc={group.imgSrc} alt="group_img" size={150} />
          <Flex direction={"column"} gap={2}>
            <Heading size={"lg"} opacity={0.8}>
              {group.name}
            </Heading>
            <Text opacity={0.6}>20 members</Text>
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
      <Flex direction={"column"} flex={1} gap={5}>
        <Heading>Messages</Heading>
        <InputWithButton
          placeholder="member name"
          hanldeSubmit={handleSubmit}
          icon={IoIosSearch}
          boxStyle={{ position: "relative", alignItems: "center" }}
          buttonStyle={{ fontSize: 28, right: 0 }}
        />
        <OnlineMember />
      </Flex>
    </Flex>
  );
};

export default GroupChat;
