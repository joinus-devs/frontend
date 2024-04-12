import { useGetGroup } from "@/apis/group";
import { DefaultLayout } from "@/components";
import { GroupDescription, GroupNav } from "@/containers";
import { QueryParser } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

interface GroupDetailProps {
  children?: React.ReactNode;
}

const GroupDetail = ({ children }: GroupDetailProps) => {
  const router = useRouter();
  const groupId = QueryParser.toNumber(router.query.id);
  const { data: group } = useGetGroup(groupId);

  return (
    <>
      <Head>
        <title>Join Us - GroupDetail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Flex direction={"column"} w={"100%"} minH={1400}>
          {group && <GroupDescription group={group} />}
          {groupId && <GroupNav groupId={groupId} />}
          <Box
            flex={2}
            overflow={"hidden"}
            borderRightWidth={"1px"}
            borderLeftWidth={"1px"}
          >
            <Box mt={8} mb={8} ml={2} mr={2}>
              {children}
            </Box>
          </Box>
        </Flex>
      </DefaultLayout>
    </>
  );
};

export default GroupDetail;
