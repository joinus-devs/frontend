import { PageRoutes, groupNavItems } from "@/constants";
import {
  Box,
  Button,
  Flex,
  Select,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { pageRouter, switchTab } from "./pageRouter";
import { useRouter } from "next/router";
import useGetPathname from "./useGetPathname";
import { toUrl } from "@/utils";
import { useEffect, useState } from "react";

interface GroupNavProps {
  groupId: number;
}

const GroupNav = ({ groupId }: GroupNavProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();
  const { name, name2 } = useGetPathname();
  //pathname을 / 를 기준으로 나누어 group/:id를 제외한 뒤에부분을 name과 name2로 지정했습니다.

  useEffect(() => {
    setTabIndex(switchTab(name));
  }, [name]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Flex>
      <Box borderBottomWidth={1} w={8} position={"relative"} top={"1px"} />
      <Tabs
        variant={"enclosed"}
        flex={1}
        size={"md"}
        position={"relative"}
        onChange={handleTabsChange}
        index={tabIndex}
      >
        <Button
          position={"absolute"}
          right={0}
          display={name === "feed" ? "block" : "none"}
          onClick={() => {
            if (name2 === "create")
              router.push(toUrl(PageRoutes.GroupFeed, { id: groupId }));
            else
              router.push(toUrl(PageRoutes.GroupCreateFeed, { id: groupId }));
          }}
        >
          {name2 === "create" ? "돌아가기" : "작성하기"}
        </Button>
        <TabList>
          {groupNavItems.map((v, i) => {
            return (
              <Tab
                key={`groupnav_${i}`}
                fontWeight={"bold"}
                fontSize={"lg"}
                as={"button"}
                onClick={() => pageRouter(v, groupId, router)}
              >
                {v}
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default GroupNav;
