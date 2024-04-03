import { useFetch, useGetGroupMembers } from "@/apis";
import { InputWithButton } from "@/components";
import { Group, User } from "@/types";
import { Box, Collapse, Flex, Heading } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import Accordion from "./Accordion";
import { useFormatMembers, useSocketObserver } from "@/hooks";
import { ApiRoutes } from "@/constants";
import { useMemo } from "react";

interface OnlineMemberProps {
  group: Group;
  viewOnlineMember: boolean;
}
export const OnlineMember = ({
  group,
  viewOnlineMember,
}: OnlineMemberProps) => {
  const formatMembers = useFormatMembers(group.id);
  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const { onlineMembers } = useSocketObserver({
    groupId: group.id,
    userId: me?.id,
  });

  console.log("online멤버변경", onlineMembers);

  const accordionMatch = useMemo(() => {
    return onlineMembers.map((memberId) => formatMembers[memberId]);
  }, [formatMembers, onlineMembers]);

  console.log("accordionMatch", accordionMatch);
  // 수정할것
  // online member를 id값으로 [1,2,3,4,5] 형식으로 받아옵니다.
  // 해당 배열을 순회하며 formatMembers[onlineMember[i]] 로 해당 멤버의 정보를 가져옵니다.
  const handleSubmit = () => {};
  return (
    <Box as={Collapse} in={viewOnlineMember} flex={1} animateOpacity>
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
