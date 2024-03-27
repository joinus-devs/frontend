import InputWithButton from "@/components/common/InputWithButton";
import { useBgColor } from "@/hooks";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { ChatLogProps } from "..";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import { getDomain, useFetch } from "@/apis";
import { QueryParser, makeMessage } from "@/utils";
import { useRouter } from "next/router";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import Image from "next/image";

interface ChatPanelProps {
  chatLog: ChatLogProps[];
  currentUserId: number;
  bgImg: number;
}

export const ChatPanel = ({
  chatLog,
  currentUserId,
  bgImg,
}: ChatPanelProps) => {
  const [chat, setChat] = useState<ChatLogProps[]>([]);
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

    socket.onopen = () => {
      ws.current = socket;
      ws.current.send(
        makeMessage("join", "join test", groupId || 0, me?.id || 0)
      );
    };
    socket.onmessage = (event) => {
      //message이벤트가 발생할때마다 chat배열에 추가
      console.log(JSON.parse(event.data));
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
        <Flex direction={"column"} gap={4} p={4}>
          {chatLog.map((v, i) => {
            if (v.userId === currentUserId)
              return (
                <MyChat chat={v} index={i} key={`mychat_${i}`} bg={color} />
              );
            else
              return (
                <OthersChat
                  chat={v}
                  index={i}
                  key={`otherschat_${i}`}
                  bg={color}
                />
              );
          })}
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
