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
  const [viewOnlineMember, setViewOnlineMember] = useState<boolean>(false);

  return (
    <Flex gap={6} p={4}>
      <Flex direction={"column"} flex={2} h={"100%"} gap={8}>
        <ChatHeader
          viewOnlineMember={viewOnlineMember}
          setViewOnlineMember={setViewOnlineMember}
          group={group}
          setBgImg={setBgImg}
        />
        <ChatPanel bgImg={bgImg} />
      </Flex>
      <OnlineMember group={group} viewOnlineMember={viewOnlineMember} />
    </Flex>
  );
};

export default GroupChat;
