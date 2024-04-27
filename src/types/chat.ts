import { ChatType } from "@/constants/chat";
import { Nullable } from ".";

export interface SocketMessage {
  body: {
    message: string;
    timestamp: number;
  };
  method: Nullable<ChatType>;
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

  method?: Nullable<ChatType>;
  timestamp?: string;
  users?: number[];
  stauts?: "success" | "error";
}
