import { useFetch } from "@/apis";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import { User } from "@/types";
import { ApiRoutes } from "@/constants";
import { useBgColor } from "@/hooks";
import { ChatLog } from "..";

interface ChatProps {
  data: ChatLog;
}

const Chat = ({ data }: ChatProps) => {
  const { data: me } = useFetch<User>(ApiRoutes.Me);
  const isMyChat = data.user === me?.id;
  const color = useBgColor();

  if (isMyChat) return <MyChat chat={data} bg={color} />;
  else return <OthersChat chat={data} bg={color} />;
};

export default Chat;
