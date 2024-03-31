export interface ChatMessage {
  body: string;
  method: "join" | "leave" | "broadcast" | null;
  status: "success" | "error";
  user?: number;
  users?: number[];
}
