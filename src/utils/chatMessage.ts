import { ChatType } from "@/constants/chat";

interface MessageFromServer {
  method: ChatType;
  body: string;
  room: number;
  user: number;
}

export const makeMessage = (
  method: MessageFromServer["method"],
  body: string,
  room: number,
  user: number
) => {
  return JSON.stringify({
    method,
    body,
    room,
    user,
  });
};
