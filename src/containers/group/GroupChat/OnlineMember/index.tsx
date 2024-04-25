import { useGetMe } from "@/apis";
import { InputWithButton } from "@/components";
import { useFormatMembers, useSocketObserver } from "@/hooks";
import { SubscribeCb } from "@/hooks/useSocketObserver";
import { Group } from "@/types";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Accordion from "./Accordion";

interface OnlineMemberProps {
  group: Group;
  isWatchOnlineMember: boolean;
  setIsWatchOnlineMember: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OnlineMember = ({
  group,
  isWatchOnlineMember,
  setIsWatchOnlineMember,
}: OnlineMemberProps) => {
  const [onlineMembers, setOnlineMembers] = useState<number[]>([]);
  const formatMembers = useFormatMembers(group.id);
  const { data: me } = useGetMe();

  const { subscribe, unsubscribe } = useSocketObserver({
    groupId: group.id,
    userId: me?.id,
  });

  useEffect(() => {
    const cb: SubscribeCb = (data) => {
      if (data.users) {
        setOnlineMembers([...data.users]);
      }
    };
    subscribe(cb);

    return () => {
      unsubscribe(cb);
    };
  }, [subscribe, unsubscribe]);

  const accordionMatch = useMemo(() => {
    return onlineMembers.map((id) => {
      return { id, ...formatMembers[id] };
    });
  }, [formatMembers, onlineMembers]);

  const handleSubmit = () => {};
  return (
    <Box
      as={Collapse}
      in={isWatchOnlineMember}
      flex={1}
      animateOpacity
      overflow={"hidden"}
      h={"100%"}
    >
      <Flex direction={"column"} gap={"20px"} h={"100%"}>
        <Flex direction={"column"} gap={"20px"}>
          <Flex justifyContent={"space-between"}>
            <Heading size={"lg"} opacity={0.9}>
              Messages
            </Heading>
            <Tooltip label={"닫기"}>
              <IconButton variant={"ghost"} aria-label="back-bt">
                <Icon
                  as={IoClose}
                  onClick={() => setIsWatchOnlineMember(!isWatchOnlineMember)}
                  w={"6"}
                  h={"6"}
                />
              </IconButton>
            </Tooltip>
          </Flex>
          <InputWithButton
            placeholder="member"
            hanldeSubmit={handleSubmit}
            icon={IoIosSearch}
            boxStyle={{ position: "relative", alignItems: "center" }}
            buttonStyle={{ fontSize: 28, right: 0 }}
          />
        </Flex>

        {accordionMatch && accordionMatch.length > 0 && (
          <Accordion members={accordionMatch} />
        )}
      </Flex>
    </Box>
  );
};
