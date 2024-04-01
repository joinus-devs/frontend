import { formatISO } from "@/utils/date";
import { Text } from "@chakra-ui/react";
import { ChatLog } from "..";
interface ChatTextTimestampProps {
  chat: ChatLog;
  bg: string;
  timeStyle?: React.CSSProperties;
}

export const ChatTextTimestamp = ({
  chat,
  bg,
  timeStyle,
}: ChatTextTimestampProps) => {
  const time = formatISO(chat.timestamp);
  return (
    <>
      <Text bg={bg} p={4} borderRadius={16}>
        {chat.message}
      </Text>
      <Text fontSize={"sm"} opacity={0.8} mr={1} style={timeStyle}>
        {time}
      </Text>
    </>
  );
};
