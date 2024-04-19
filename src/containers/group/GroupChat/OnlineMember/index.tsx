import { useFetch, useGetMe } from "@/apis";
import { InputWithButton } from "@/components";
import { ApiRoutes } from "@/constants";
import { useFormatMembers, useSocketObserver } from "@/hooks";
import { SubscribeCb } from "@/hooks/useSocketObserver";
import { Group, User } from "@/types";
import { Box, Collapse, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Accordion from "./Accordion";

interface OnlineMemberProps {
  group: Group;
  isWatchOnlineMember: boolean;
}
export const OnlineMember = ({
  group,
  isWatchOnlineMember,
}: OnlineMemberProps) => {
  const formatMembers = useFormatMembers(group.id);
  const { data: me } = useGetMe();
  const [onlineMembers, setOnlineMembers] = useState<number[]>([]);
  const { subscribe, unsubscribe } = useSocketObserver({
    groupId: group.id,
    userId: me?.id,
  });

  useEffect(() => {
    const cb: SubscribeCb = (data) => {
      if (data.users) {
        setOnlineMembers(data.users);
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
    <Box as={Collapse} in={isWatchOnlineMember} flex={1} animateOpacity>
      <Flex direction={"column"} gap={5}>
        <Heading size={"lg"} opacity={0.9}>
          Messages
        </Heading>
        <InputWithButton
          placeholder="member name"
          hanldeSubmit={handleSubmit}
          icon={IoIosSearch}
          boxStyle={{ position: "relative", alignItems: "center" }}
          buttonStyle={{ fontSize: 28, right: 0 }}
        />

        <Accordion members={accordionMatch || []} />
      </Flex>
    </Box>
  );
};
