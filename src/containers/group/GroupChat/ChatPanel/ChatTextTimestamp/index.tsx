import { ChatLogProps } from "../..";
import { Text } from "@chakra-ui/react";
interface ChatTextTimestampProps {
  chat: ChatLogProps;
  bg: string;
  timeStyle?: React.CSSProperties;
}

export const ChatTextTimestamp = ({
  chat,
  bg,
  timeStyle,
}: ChatTextTimestampProps) => {
  return (
    <>
      <Text bg={bg} p={4} borderRadius={16}>
        {chat.chat}
      </Text>
      <Text fontSize={"sm"} opacity={0.8} mr={1} style={timeStyle}>
        {chat.createdAt}
      </Text>
    </>
  );
};
