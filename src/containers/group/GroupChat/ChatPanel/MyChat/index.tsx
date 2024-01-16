import { Flex, Text } from "@chakra-ui/react";
import { ChatLogProps } from "../..";
import { useBgColor } from "@/hooks";

interface MyChatProps {
  chat: ChatLogProps;
  index: number;
  bg: string;
}
export const MyChat = ({ chat, index, bg }: MyChatProps) => {
  return (
    <Flex key={`chat_${index}`} justifyContent={"flex-end"} textAlign={"end"}>
      <Flex direction={"column"} p={4} borderRadius={"lg"} maxW={400} gap={2}>
        <Text bg={bg} p={4} borderRadius={16}>
          {chat.chat}
        </Text>
        <Text fontSize={"sm"} opacity={0.8} mr={1}>
          {chat.createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};
