import { ApiResponseChat } from "@/types/chat";
import { Flex } from "@chakra-ui/react";
import { ChatTextTimestamp } from "../../ChatTextTimestamp";

interface MyChatProps {
  chat: ApiResponseChat;
  bg: string;
}
export const MyChat = ({ chat, bg }: MyChatProps) => {
  return (
    <Flex justifyContent={"flex-end"} p={2}>
      <Flex direction={"column"} borderRadius={"lg"} gap={2}>
        <ChatTextTimestamp
          chat={chat}
          bg={bg}
          timeStyle={{ textAlign: "end" }}
          boxStyle={{ alignItems: "flex-end" }}
        />
      </Flex>
    </Flex>
  );
};
