import { Flex } from "@chakra-ui/react";
import { ChatLogProps } from "../..";
import { ChatTextTimestamp } from "../ChatTextTimestamp";

interface MyChatProps {
  chat: ChatLogProps;
  index: number;
  bg: string;
}
export const MyChat = ({ chat, index, bg }: MyChatProps) => {
  return (
    <Flex key={`chat_${index}`} justifyContent={"flex-end"}>
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
