import { useGetGroupMembers } from "@/apis";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Template } from "./Template";

const GroupMember = () => {
  const router = useRouter();
  const numberingQuery = Number(router.query.id);
  const { data: admin } = useGetGroupMembers(numberingQuery, {
    roles: "admin",
  });

  const { data: member } = useGetGroupMembers(numberingQuery, {
    roles: "member",
  });

  const { data: staff } = useGetGroupMembers(numberingQuery, {
    roles: "staff",
  });

  const { data: manager } = useGetGroupMembers(numberingQuery, {
    roles: ["admin", "staff"],
  });

  return (
    <Box minH={800}>
      <Flex gap={8} direction={"column"} pt={8}>
        <Template
          groupMember={admin?.data}
          header="Admin"
          groupId={numberingQuery}
        />
        <Template
          groupMember={staff?.data}
          header="Manager"
          groupId={numberingQuery}
        />
        <Template
          groupMember={member?.data}
          header="User"
          groupId={numberingQuery}
        />
      </Flex>
    </Box>
  );
};

export default GroupMember;
