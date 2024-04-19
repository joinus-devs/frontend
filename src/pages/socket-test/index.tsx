import { getDomain } from "@/apis";
import { Button, Input } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
interface MessageFromServer {
  method: "join" | "leave" | "broadcast";
  body: string;
  room: number;
  user: number;
}

const makeMessage = (method: MessageFromServer["method"], body: string) => {
  return JSON.stringify({
    method,
    body,
    room: 1,
    user: 1,
  });
};

const SocketTest = () => {
  const ws = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const domain = getDomain("", "ws");
    const socket = new WebSocket(domain);

    socket.onopen = () => {
      console.log("connected");
    };
    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };
    socket.onclose = () => {
      console.log("disconnected");
    };

    ws.current = socket;
  }, []);

  const send = useCallback(() => {
    if (!ws.current) return;
    if (ws.current.readyState !== ws.current.OPEN) {
      console.log("not connected");
      return;
    }
    ws.current?.send(makeMessage("broadcast", inputRef.current?.value || ""));
  }, []);

  const join = useCallback(() => {
    if (!ws.current) return;
    ws.current.send(makeMessage("join", "join test"));
  }, []);

  const leave = useCallback(() => {
    if (!ws.current) return;
    ws.current.send(makeMessage("leave", "leave test"));
  }, []);

  return (
    <>
      <Input ref={inputRef} />
      <Button onClick={send}>Send</Button>
      <Button onClick={join}>join</Button>
      <Button onClick={leave}>leave</Button>
    </>
  );
};

export default SocketTest;
