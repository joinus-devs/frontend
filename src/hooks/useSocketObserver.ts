import { getDomain } from "@/apis";
import { SocketMessage } from "@/types/chat";
import { makeMessage } from "@/utils";
import { useCallback, useEffect, useRef } from "react";

interface UseSocketObserverProps {
  groupId?: number;
  userId?: number;
}

const useSocketObserver = ({ groupId, userId }: UseSocketObserverProps) => {
  const ws = useRef<WebSocket | null>(null);
  const callback = useRef<Function | null>(null);

  const handleSubmit: (value: any) => void = useCallback(
    (value) => {
      if (!groupId || !userId) return;

      if (!ws.current) return;
      if (ws.current.readyState !== ws.current.OPEN) {
        console.log("not connected");
        return;
      }

      ws.current?.send(makeMessage("broadcast", value, groupId, userId));
    },
    [groupId, userId]
  );

  useEffect(() => {
    if (!groupId || !userId) return;
    const domain = getDomain("", "ws");
    const socket = new WebSocket(domain);
    ws.current = socket;

    socket.onopen = () => {
      ws.current?.send(makeMessage("join", "join test", groupId, userId));
    };
    socket.onmessage = (event) => {
      const data: SocketMessage = JSON.parse(event.data);
      console.log("event", data);
      callback.current && callback.current(data);
    };
    socket.onclose = () => {
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
  };
};

export default useSocketObserver;
