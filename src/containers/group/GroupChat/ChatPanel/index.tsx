import { useFetch, useGetMe } from "@/apis";
import { useGetGroupChat } from "@/apis/chat";
import VirtualListReverse from "@/components/common/DynamicInfiniteList/VirtualListReverse";
import { ApiRoutes } from "@/constants";
import { ChatType } from "@/constants/chat";
import { useBgColor, useSocketObserver } from "@/hooks";
import { SubscribeCb } from "@/hooks/useSocketObserver";
import { User } from "@/types";
import { ApiResponseChat } from "@/types/chat";
import { QueryParser } from "@/utils";
import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const [chatFromSocket, setChatFromSocket] = useState<ApiResponseChat[]>([]);

  const router = useRouter();
  const color = useBgColor();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const groupId = QueryParser.toNumber(router.query.id);

  const { data: me } = useGetMe();
  const { data, isFetching, isSuccess, fetchNextPage } = useGetGroupChat({
    groupId,
    limit: 20,
  });

  const chatFromApi = useMemo(() => {
    const flattened = (data?.pages ?? []).map((page) => page.data).flat();
    return flattened.reverse();
  }, [data]);

  const { subscribe, unsubscribe, submit } = useSocketObserver({
    groupId,
    userId: me?.id,
  });

  useEffect(() => {
    const cb: SubscribeCb = (data) => {
      setChatFromSocket((prev) => [
        ...prev,
        {
          method: data.method,
          user_id: data.user ?? 0,
          club_id: groupId!,
          message: data.body.message,
          timestamp: data.body.timestamp.toString(),
        },
      ]);
    };

    subscribe(cb);

    return () => {
      unsubscribe(cb);
    };
  }, [groupId, subscribe, unsubscribe]);

  return (
    <Flex shadow={"lg"} position={"relative"} direction={"column"}>
      <Box opacity={0.5} position={"absolute"} w={"100%"} h={"100%"}>
        <Image
          src={`/group_chat${bgImg}.jpg`}
          alt="group_chat"
          fill
          style={{ objectFit: "cover" }}
          sizes={"100%"}
        />
      </Box>

      <VirtualListReverse<ApiResponseChat>
        dataFromApi={chatFromApi}
        dataFromSocket={chatFromSocket}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        renderItem={Chat}
      />
      <Box
        as={"form"}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (!inputRef.current?.value) return;
          submit(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }}
      >
        <Flex width={"100%"} p={2} position={"relative"}>
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
            w={12}
            h={12}
            zIndex={1}
            right={4}
            top={4}
          >
            <Icon as={FaCheck} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
