import { ApiResponseChat } from "@/types/chat";
import { formatISO } from "@/utils/date";
import { Flex, Text } from "@chakra-ui/react";
interface ChatTextTimestampProps {
  chat: ApiResponseChat;
  bg: string;
  timeStyle?: React.CSSProperties;
  boxStyle?: React.CSSProperties;
}

export const ChatTextTimestamp = ({
  chat,
  bg,
  timeStyle,
  boxStyle,
}: ChatTextTimestampProps) => {
  let time = "";
  if (chat.created_at) {
    time = formatISO(chat.created_at);
  } else if (chat.timestamp) {
    const date = new Date(Number(chat.timestamp));
    time = formatISO(String(date));
  }

  return (
    <Flex direction={"column"} gap={1} style={boxStyle}>
      <Text
        bg={bg}
        p={4}
        borderRadius={16}
        maxW={"300px"}
        overflowWrap={"break-word"}
      >
        {chat.message}
      </Text>
      <Text fontSize={"sm"} opacity={0.8} mr={1} style={timeStyle}>
        {time}
      </Text>
    </Flex>
  );
};
