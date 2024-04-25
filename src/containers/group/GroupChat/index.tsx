import { Group } from "@/types";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import { ChatPanel } from "./ChatPanel";
import { OnlineMember } from "./OnlineMember";

interface GroupChatProps {
  group: Group;
}

const GroupChat = ({ group }: GroupChatProps) => {
  const [bgImg, setBgImg] = useState<number>(0);

  const [isWatchOnlineMember, setIsWatchOnlineMember] =
    useState<boolean>(false);

  return (
    <Flex
      gap={6}
      p={2}
      alignItems="stretch"
      overflow={"hidden"}
      h={1200}
      maxH={1200}
    >
      <Flex direction={"column"} flex={2} gap={8} overflow={"hidden"}>
        <ChatHeader
          isWatchOnlineMember={isWatchOnlineMember}
          setIsWatchOnlineMember={setIsWatchOnlineMember}
          group={group}
          setBgImg={setBgImg}
        />
        <ChatPanel bgImg={bgImg} />
      </Flex>
      <OnlineMember
        group={group}
        isWatchOnlineMember={isWatchOnlineMember}
        setIsWatchOnlineMember={setIsWatchOnlineMember}
      />
    </Flex>
  );
};

export default GroupChat;
