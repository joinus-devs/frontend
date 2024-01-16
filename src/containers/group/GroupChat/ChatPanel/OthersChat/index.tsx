import { Box, Flex, Text } from "@chakra-ui/react";
import { ChatLogProps } from "../..";
import Image from "next/image";
import { useBgColor } from "@/hooks";

interface OthersChatProps {
  chat: ChatLogProps;
  index: number;
  bg: string;
}
export const OthersChat = ({ chat, index, bg }: OthersChatProps) => {
  return (
    <Flex key={`chat_${index}`} justifyContent={"flex-start"}>
      <Flex>
        <Box
          borderRadius={"50%"}
          overflow={"hidden"}
          width={16}
          height={16}
          position={"relative"}
          mt={2}
        >
          <Image src={chat.userImgSrc} alt="user_img" layout="fill" />
        </Box>
        <Flex direction={"column"} p={3} borderRadius={"lg"} maxW={400} gap={2}>
          <Text opacity={0.8} fontSize={"md"} pl={1}>
            {chat.userName}
          </Text>
          <Flex gap={2} alignItems={"end"}>
            <Text bg={bg} p={4} borderRadius={16}>
              {chat.chat}
            </Text>
            <Text fontSize={"sm"} opacity={0.8}>
              {chat.createdAt}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
