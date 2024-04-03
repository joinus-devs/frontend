import { useFetch, useLoadMore } from "@/apis";
import { ApiRoutes } from "@/constants";
import { ChatType } from "@/constants/chat";
import { useBgColor, useSocketObserver } from "@/hooks";
import { User } from "@/types";
import { ApiResponseChat, SocketMessage } from "@/types/chat";
import { QueryParser, toUrl } from "@/utils";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Chat from "./Chat";

export interface ChatLog {
  user: number | undefined;
  message: string;
  timestamp: string;
  method: ChatType.Join | ChatType.Leave | ChatType.Chat | null;
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
  const { data: chatData } = useLoadMore<ApiResponseChat[]>(
    toUrl(ApiRoutes.Chat, { id: groupId ?? 0 }),
    {
      cursor: 0,
      limit: 10,
    }
  );

  const { subscribe, submit } = useSocketObserver({ groupId, userId: me?.id });

  useEffect(() => {
    if (chatData) {
      setChat(
        chatData.pages.flatMap((data) => {
          return data.data.map((chat) => {
            return {
              method: ChatType.Chat,
              user: chat.user_id,
              message: chat.message,
              timestamp: new Date(
                chat?.created_at as string | number | Date
              ).toString(),
            };
          });
        })
      );
    }

    subscribe((data: SocketMessage) => {
      setChat((prev) => [
        ...prev,
        {
          method: data.method,
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
