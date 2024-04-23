import { useGetGroup } from "@/apis/group";
import { DefaultLayout } from "@/components";
import { GroupDescription, GroupNav } from "@/containers";
import { QueryParser } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface GroupDetailProps {
  children?: React.ReactNode;
}

const GroupDetail = ({ children }: GroupDetailProps) => {
  const router = useRouter();
  const groupId = QueryParser.toNumber(router.query.id);
  const { data: group } = useGetGroup(groupId);

  return (
    <DefaultLayout>
      <Flex direction={"column"} w={"100%"} minH={1200}>
        {group && <GroupDescription group={group} />}
        {groupId && <GroupNav groupId={groupId} />}
        <Box
          mt={"1px"}
          overflow={"hidden"}
          borderRightWidth={"1px"}
          borderLeftWidth={"1px"}
        >
          <Box mt={8} mb={8} ml={2} mr={2} minH={800}>
            {children}
          </Box>
        </Box>
      </Flex>
    </DefaultLayout>
  );
};

export default GroupDetail;
