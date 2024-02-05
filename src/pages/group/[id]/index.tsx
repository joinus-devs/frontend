import { useGetGroup } from "@/apis/group";
import { DefaultLayout } from "@/components";
import { PageRoutes } from "@/constants";
import { GroupDescription, GroupNav } from "@/containers";
import { GroupBanner } from "@/containers/group";
import { DynamicRender } from "@/containers/group/DynamicRender";
import { Group } from "@/types";
import { toUrl } from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const dummyGroupData: Group = {
  imgSrc: "/none-groupimg.webp",
  name: "음악속으로",
  categories: ["음악"],
  description: "안녕하세요! 음악을 좋아하는 사람들의 모임입니다.",
  minimum_age: 0,
  maximum_age: 100,
  capacity: 10,
  sex: true,
};

interface GroupDetailProps {
  children: React.ReactNode;
}

const GroupDetail = ({ children }: GroupDetailProps) => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: group, isSuccess } = useGetGroup(numberingQueryId);
  const [navItem, setNavItem] = useState("Home");
  const [onCreateFeed, setOnCreateFeed] = useState(false);

  return (
    <>
      <Head>
        <title>Join Us - GroupDetail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        {isSuccess && (
          <Flex direction={"column"} w={"100%"} minH={1400}>
            <GroupBanner />
            <GroupDescription group={group} />
            <GroupNav
              setSelected={setNavItem}
              selected={navItem}
              groupId={numberingQueryId}
            />
            {/* <DynamicRender
              selected={navItem}
              group={group}
              onCreateFeed={onCreateFeed}
              setOnCreateFeed={setOnCreateFeed}
            /> */}
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
        )}
      </DefaultLayout>
    </>
  );
};

export default GroupDetail;
