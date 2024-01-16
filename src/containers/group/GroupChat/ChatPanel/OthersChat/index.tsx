import { Flex, Text } from "@chakra-ui/react";
import { ChatLogProps } from "../..";
import { CircleImg } from "@/components";
import { ChatTextTimestamp } from "../ChatTextTimestamp";

interface OthersChatProps {
  chat: ChatLogProps;
  index: number;
  bg: string;
}

export const OthersChat = ({ chat, index, bg }: OthersChatProps) => {
  return (
    <Flex key={`chat_${index}`} justifyContent={"flex-start"}>
      <Flex>
        <CircleImg
          imgSrc={chat.userImgSrc}
          alt="user_img"
          size={16}
          style={{ top: 8 }}
        />
        <Flex direction={"column"} p={3} borderRadius={"lg"} maxW={400} gap={2}>
          <Text opacity={0.8} fontSize={"md"} pl={1}>
            {chat.userName}
          </Text>
          <Flex gap={2} alignItems={"end"}>
            <ChatTextTimestamp chat={chat} bg={bg} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
