import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ChatLogProps } from "..";
import { FaCheck } from "react-icons/fa6";
import { Icon } from "@chakra-ui/react";
import { MyChat } from "./MyChat";
import { OthersChat } from "./OthersChat";
import { useBgColor } from "@/hooks";
import InputWithButton from "@/components/common/InputWithButton";
import { useCallback } from "react";

interface ChatPanelProps {
  chatLog: ChatLogProps[];
  currentUserId: number;
}

export const ChatPanel = ({ chatLog, currentUserId }: ChatPanelProps) => {
  const color = useBgColor();

  const handleSubmit = useCallback(() => {}, []);

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
      <InputWithButton
        placeholder="message"
        hanldeSubmit={handleSubmit}
        icon={FaCheck}
        boxStyle={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 16,
        }}
        inputStyle={{ backgroundColor: color }}
        buttonStyle={{ right: 16 }}
      />
    </>
  );
};
