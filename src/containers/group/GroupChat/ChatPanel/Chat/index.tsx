import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { useBgColor, useFormatMembers } from "@/hooks";
import { User } from "@/types";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { ChatLog } from "..";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import { ChatType } from "@/constants/chat";
import ParticipationLog from "./ParticipationLog";

interface ChatProps {
  data: ChatLog;
}

const Chat = ({ data }: ChatProps) => {
  const router = useRouter();
  const groupId = QueryParser.toNumber(router.query.id);

  const members = useFormatMembers(groupId || 0);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const isMyChat = data.user === me?.id;
  const isParticipantLog =
    data.message === ChatType.Join || data.message === ChatType.Leave;

  const color = useBgColor();

  if (isParticipantLog) return <ParticipationLog log={data} />;
  if (isMyChat) return <MyChat chat={data} bg={color} />;
  else return <OthersChat chat={data} bg={color} members={members} />;
};

export default Chat;
