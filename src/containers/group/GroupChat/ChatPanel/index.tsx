import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ChatLogProps } from "..";
import { FaCheck } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import { useBgColor } from "@/hooks";

interface ChatPanelProps {
  chatLog: ChatLogProps[];
  currentUserId: number;
}
export const ChatPanel = ({ chatLog, currentUserId }: ChatPanelProps) => {
  const color = useBgColor();
  return (
    <>
      <Box h={1100} overflowY={"auto"} position={"absolute"} top={0} w={"100%"}>
        <Flex direction={"column"} gap={4} p={4}>
          {chatLog.map((v, i) => {
            if (v.userId === currentUserId)
              return (
                <MyChat chat={v} index={i} key={`mychat_${i}`} bg={color} />
              );
            else
              return (
                <OthersChat
                  chat={v}
                  index={i}
                  key={`otherschat_${i}`}
                  bg={color}
                />
              );
          })}
        </Flex>
      </Box>
      <Flex position={"absolute"} bottom={0} w={"100%"} gap={4} p={4}>
        <Input placeholder="message" size="lg" h={16} bg={color} />
        <Button h={12} w={12} position={"absolute"} right={4} m={2} zIndex={1}>
          <Icon as={FaCheck} />
        </Button>
      </Flex>
    </>
  );
};
