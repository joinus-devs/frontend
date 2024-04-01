import { timer } from ".";

export interface SocketMessage {
  body: {
    message: string;
    timestamp: number;
  };
  method: "join" | "leave" | "broadcast" | null;
  status: "success" | "error";
  user?: number;
  users?: number[];
}

export interface ApiResponseChat extends timer {
  user_id: number;
  club_id: number;
  message: string;
}
