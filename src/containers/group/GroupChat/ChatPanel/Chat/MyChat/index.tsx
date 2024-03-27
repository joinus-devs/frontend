import { Flex } from "@chakra-ui/react";
import { ChatTextTimestamp } from "../../ChatTextTimestamp";
import { ChatLog } from "../..";

interface MyChatProps {
  chat: ChatLog;
  bg: string;
}
export const MyChat = ({ chat, bg }: MyChatProps) => {
  return (
    <Flex justifyContent={"flex-end"}>
      <Flex direction={"column"} p={4} borderRadius={"lg"} maxW={400} gap={2}>
        <ChatTextTimestamp
          chat={chat}
          bg={bg}
          timeStyle={{ textAlign: "end" }}
        />
      </Flex>
    </Flex>
  );
};
