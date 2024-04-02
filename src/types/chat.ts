import { ChatType } from "@/constants/chat";
import { timer } from ".";

export interface SocketMessage {
  body: {
    message: string;
    timestamp: number;
  };
  method: ChatType.Join | ChatType.Leave | ChatType.Chat | null;
  status: "success" | "error";
  user?: number;
  users?: number[];
}

export interface ApiResponseChat extends timer {
  user_id: number;
  club_id: number;
  message: string;
}
