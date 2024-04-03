import { Flex, Text } from "@chakra-ui/react";
import { CircleImg } from "@/components";
import { ChatTextTimestamp } from "../../ChatTextTimestamp";
import { ChatLog } from "../..";

interface OthersChatProps {
  chat: ChatLog;
  bg: string;
  members: { [key: number]: { name: string; profile: string } };
}
export const OthersChat = ({ chat, bg, members }: OthersChatProps) => {
  return (
    <Flex justifyContent={"flex-start"}>
      {chat.user && members[chat.user] && (
        <Flex>
          <CircleImg
            imgSrc={members[chat.user].profile}
            alt="user_img"
            size={16}
            style={{ top: 8 }}
          />
          <Flex direction={"column"} p={3} gap={2}>
            <Text opacity={0.8} fontSize={"md"} pl={1}>
              {members[chat.user].name}
            </Text>
            <Flex direction={"column"} borderRadius={"lg"} maxW={400} gap={2}>
              <ChatTextTimestamp
                chat={chat}
                bg={bg}
                timeStyle={{ textAlign: "end" }}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};