import { getDomain } from "@/apis";
import { ChatType } from "@/constants/chat";
import { User } from "@/types";
import { SocketMessage } from "@/types/chat";
import { makeMessage } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseSocketObserverProps {
  groupId?: number;
  userId?: number;
}

const useSocketObserver = ({ groupId, userId }: UseSocketObserverProps) => {
  const [onlineMembers, setOnlineMembers] = useState<number[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const callback = useRef<Function | null>(null);

  const handleSubmit = useCallback(
    (value: string) => {
      console.log("submit", value);
      if (!groupId || !userId) return;
      if (!ws.current) return;
      if (ws.current.readyState !== ws.current.OPEN) {
        console.log("submit error : not connected");
        return;
      }

      ws.current?.send(makeMessage(ChatType.Chat, value, groupId, userId));
    },
    [groupId, userId]
  );

  useEffect(() => {
    if (!groupId || !userId) return;
    const domain = getDomain("", "ws");
    const socket = new WebSocket(domain);
    ws.current = socket;

    socket.onopen = () => {
      ws.current?.send(
        makeMessage(ChatType.Join, "join test", groupId, userId)
      );
    };
    socket.onmessage = (event) => {
      const data: SocketMessage = JSON.parse(event.data);

      (data.method === ChatType.Join || data.method === ChatType.Leave) &&
        setOnlineMembers(data.users || []);

      console.log("event", data);
      callback.current && callback.current(data);
    };

    socket.onclose = (e: CloseEvent) => {
      console.log("error", e.code);
      console.log("disconnected");
    };

    return () => {
      ws.current && ws.current.close();
    };
  }, [groupId, userId]);

  return {
    subscribe: useCallback((cb: Function) => {
      callback.current = cb;
    }, []),
    submit: handleSubmit,
    onlineMembers,
  };
};

export default useSocketObserver;
