import { Flex, Text } from "@chakra-ui/react";
import { CircleImg } from "@/components";
import { ChatTextTimestamp } from "../../ChatTextTimestamp";
import { ChatLog } from "../..";

interface OthersChatProps {
  chat: ChatLog;
  bg: string;
}
const img = "";
const user = "";
//해당 정보는 채팅방접속시 map으로 정보를 가져와야함

export const OthersChat = ({ chat, bg }: OthersChatProps) => {
  return (
    <Flex justifyContent={"flex-start"}>
      <Flex>
        <CircleImg imgSrc={img} alt="user_img" size={16} style={{ top: 8 }} />
        <Flex direction={"column"} p={3} borderRadius={"lg"} maxW={400} gap={2}>
          <Text opacity={0.8} fontSize={"md"} pl={1}>
            {user}
          </Text>
          <Flex gap={2} alignItems={"end"}>
            <ChatTextTimestamp chat={chat} bg={bg} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
