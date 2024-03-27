import { getDomain, useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { useBgColor } from "@/hooks";
import { User } from "@/types";
import { QueryParser, makeMessage } from "@/utils";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Chat from "./Chat";
import { set } from "react-hook-form";

export interface ChatLog {
  user: number;
  body: {
    message: string;
    timestamp: string;
  };
}

interface dummyType {
  status: string;
  body: string;
  user: number;
}

interface ChatPanelProps {
  bgImg: number;
}

const dummyChatLog: ChatLog[] = [
  {
    user: 1,
    body: {
      message: "Hello, World!",
      timestamp: "2021-10-10 10:10:10",
    },
  },
  {
    user: 2,
    body: {
      message: "Hi, there!",
      timestamp: "2021-10-10 10:10:10",
    },
  },
  {
    user: 1,
    body: {
      message: "How are you?",
      timestamp: "2021-10-10 10:10:10",
    },
  },
  {
    user: 2,
    body: {
      message: "I'm fine, thank you!",
      timestamp: "2021-10-10 10:10:10",
    },
  },
];
export const ChatPanel = ({ bgImg }: ChatPanelProps) => {
  const [chat, setChat] = useState<ChatLog[]>([]);
  //초기 채팅방의 내용을 가져옴

  const router = useRouter();
  const color = useBgColor();
  const ws = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupId = QueryParser.toNumber(router.query.id);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (!ws.current) return;
      if (ws.current.readyState !== ws.current.OPEN) {
        console.log("not connected");
        return;
      }
      ws.current?.send(
        makeMessage(
          "broadcast",
          inputRef.current?.value || "",
          groupId || 0,
          me?.id || 0
        )
      );
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    },
    [groupId, me?.id]
  );

  useEffect(() => {
    const domain = getDomain("", "ws");
    const socket = new WebSocket(domain);
    ws.current = socket;

    socket.onopen = () => {
      ws.current?.send(
        makeMessage("join", "join test", groupId || 0, me?.id || 0)
      );
      setChat(dummyChatLog);
      console.log(ws.current);
    };
    socket.onmessage = (event) => {
      //message이벤트가 발생할때마다 chat배열에 추가
      console.log(JSON.parse(event.data));
      const data: dummyType = JSON.parse(event.data);
      setChat((prev) => [
        ...prev,
        {
          user: data.user,
          body: { message: data.body, timestamp: new Date().toISOString() },
        },
      ]);
    };
    socket.onclose = () => {
      console.log("disconnected");
    };

    return () => {
      ws.current && ws.current.close();
    };
  }, [groupId, me?.id]);

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
      <form onSubmit={handleSubmit}>
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
