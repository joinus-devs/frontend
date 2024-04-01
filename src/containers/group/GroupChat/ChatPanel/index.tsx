import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { useBgColor, useSocketObserver } from "@/hooks";
import { InfiniteResponse, User } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Chat from "./Chat";
import { ApiResponseChat, SocketMessage } from "@/types/chat";

export interface ChatLog {
  user: number | undefined;
  message: string;
  timestamp: string;
}

interface ChatPanelProps {
  bgImg: number;
}

export const ChatPanel = ({ bgImg }: ChatPanelProps) => {
  const [chat, setChat] = useState<ChatLog[]>([]);
  //초기 채팅방의 내용을 가져옴

  const router = useRouter();
  const color = useBgColor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupId = QueryParser.toNumber(router.query.id);

  const { data: me } = useFetch<User>(ApiRoutes.Me);
  const { data: chatData } = useFetch<InfiniteResponse<ApiResponseChat>>(
    toUrl(ApiRoutes.Chat, { groupId })
  );

  const { subscribe, submit } = useSocketObserver({ groupId, userId: me?.id });

  useEffect(() => {
    //기존채팅정보를 chat에 저장
    console.log("chatData", chatData);
    subscribe((data: SocketMessage) => {
      setChat((prev) => [
        ...prev,
        {
          user: data.user,
          message: data.body.message,
          timestamp: new Date(data.body.timestamp).toString(),
        },
      ]);
    });
  }, [chatData, subscribe]);

  return (
    <Box h={1200} shadow={"lg"} position={"relative"}>
      <Box opacity={0.5}>
        <Image
          src={`/group_chat${bgImg}.jpg`}
          alt="group_chat"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box h={1100} overflowY={"auto"} position={"absolute"} top={0} w={"100%"}>
        <Flex direction={"column"} p={4} gap={4}>
          {chat.map((data, i) => (
            <Chat key={`chat${i}`} data={data} />
          ))}
        </Flex>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputRef.current?.value) return;
          submit(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }}
      >
        <Flex position={"absolute"} bottom={0} width={"100%"} p={16}>
          <Input
            placeholder={"message"}
            size="lg"
            h={16}
            backgroundColor={color}
            ref={inputRef}
          />
          <Button
            type="submit"
            position={"absolute"}
            fontWeight={"bold"}
            m={2}
            w={12}
            h={12}
            zIndex={1}
            right={16}
          >
            <Icon as={FaCheck} />
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
