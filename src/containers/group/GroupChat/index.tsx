import { Group, Nullable } from "@/types";
import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import { ChatPanel } from "./ChatPanel";
import { OnlineMember } from "./OnlineMember";

interface GroupChatProps {
  group: Group;
}

const GroupChat = ({ group }: GroupChatProps) => {
  const [bgImg, setBgImg] = useState<number>(0);
  const [flexHeight, setFlexHeight] = useState<Nullable<number>>(null);

  const [isWatchOnlineMember, setIsWatchOnlineMember] =
    useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const fixedHeight = ref.current.clientHeight;
    setFlexHeight(fixedHeight);
  }, []);

  return (
    <Flex gap={6} p={4} alignItems="stretch">
      <Flex direction={"column"} flex={2} h={"100%"} gap={8} ref={ref}>
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
        parentHeight={flexHeight ?? 0}
        setIsWatchOnlineMember={setIsWatchOnlineMember}
      />
    </Flex>
  );
};

export default GroupChat;
