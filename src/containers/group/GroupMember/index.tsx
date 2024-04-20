import { useGetGroupMembers, useGetMe } from "@/apis";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Template } from "./Template";

const GroupMember = () => {
  const router = useRouter();
  const numberingQuery = Number(router.query.id);
  const { data: staff } = useGetGroupMembers(numberingQuery, {
    roles: ["admin", "staff"],
  });

  const { data: member } = useGetGroupMembers(numberingQuery, {
    roles: ["member"],
  });

  return (
    <Flex gap={16} direction={"column"}>
      <Template
        groupMembers={staff?.data}
        header="운영진"
        groupId={numberingQuery}
      />
      <Template
        groupMembers={member?.data}
        header="그룹원"
        groupId={numberingQuery}
      />
    </Flex>
  );
};

export default GroupMember;
