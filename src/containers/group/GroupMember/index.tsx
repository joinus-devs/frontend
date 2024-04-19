import { useGetGroupMembers, useGetMe } from "@/apis";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Template } from "./Template";

const GroupMember = () => {
  const router = useRouter();
  const numberingQuery = Number(router.query.id);
  const { data: admin } = useGetGroupMembers(numberingQuery, {
    roles: ["admin"],
  });

  const { data: member } = useGetGroupMembers(numberingQuery, {
    roles: ["member"],
  });

  const { data: staff } = useGetGroupMembers(numberingQuery, {
    roles: ["staff"],
  });

  const { data: me } = useGetMe();

  return (
    <Box minH={800}>
      <Flex gap={8} direction={"column"} pt={8}>
        <Template
          groupMember={admin?.data}
          header="Admin"
          groupId={numberingQuery}
          admin={me?.id === admin?.data[0].id ? true : false}
        />
        <Template
          groupMember={staff?.data}
          header="Manager"
          groupId={numberingQuery}
          admin={me?.id === admin?.data[0].id ? true : false}
        />
        <Template
          groupMember={member?.data}
          header="User"
          groupId={numberingQuery}
          admin={me?.id === admin?.data[0].id ? true : false}
        />
      </Flex>
    </Box>
  );
};

export default GroupMember;
