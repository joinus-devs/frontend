import { useGetGroupMembers } from "@/apis";
import { Group, User } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import { Template } from "./Template";

interface GroupMemberProps {
  member: User[];
}
const GroupMember = ({ member }: GroupMemberProps) => {
  return (
    <Box minH={800}>
      <Flex gap={8} direction={"column"} pt={8}>
        <Template groupMember={member} header="Manager" />
        <Template groupMember={member} header="User" />
      </Flex>
    </Box>
  );
};

export default GroupMember;
