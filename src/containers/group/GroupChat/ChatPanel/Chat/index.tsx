import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { ChatType } from "@/constants/chat";
import { useBgColor, useFormatMembers } from "@/hooks";
import { User } from "@/types";
import { ApiResponseChat } from "@/types/chat";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import ParticipationLog from "./ParticipationLog";

interface ChatProps {
  data: ApiResponseChat;
}

const Chat = ({ data }: ChatProps) => {
  const router = useRouter();
  const groupId = QueryParser.toNumber(router.query.id);

  const members = useFormatMembers(groupId || 0);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const isMyChat = data.user_id === me?.id;
  const isParticipantLog =
    data.method === ChatType.Join || data.method === ChatType.Leave;

  const color = useBgColor();

  if (isParticipantLog)
    return <ParticipationLog participantId={data.user_id} members={members} />;
  if (isMyChat) return <MyChat chat={data} bg={color} />;
  else return <OthersChat chat={data} bg={color} members={members} />;
};

export default Chat;
