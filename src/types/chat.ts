import { ChatType } from "@/constants/chat";
import { Nullable, timer } from ".";

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

export interface ApiResponseChat {
  user_id: number;
  club_id: number;
  message: string;

  id?: number;
  created_at?: string;
  updated_at?: Nullable<string>;
  deleted_at?: string;

  method?: ChatType.Join | ChatType.Leave | ChatType.Chat | null;
  timestamp?: string;
  users?: number[];
  stauts?: "success" | "error";
}
