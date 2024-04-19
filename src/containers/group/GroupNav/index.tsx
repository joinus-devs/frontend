import { useGetGroupMembers, useGetMe } from "@/apis";
import { PageRoutes, groupNavItems } from "@/constants";
import { toUrl } from "@/utils";
import { Button, Flex, Icon, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { pageRouter, switchTab } from "./pageRouter";
import useGetPathname from "./useGetPathname";

interface GroupNavProps {
  groupId: number;
}

const GroupNav = ({ groupId }: GroupNavProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isManager, setIsManger] = useState(false);
  const router = useRouter();
  const { name, name2 } = useGetPathname();

  //pathname을 / 를 기준으로 나누어 group/:id를 제외한 뒤에부분을 name과 name2로 지정했습니다.
  const { data: me, isSuccess: meSuccess } = useGetMe();

  const { data: manager, isSuccess: managerSuccess } = useGetGroupMembers(
    groupId,
    {
      roles: ["admin", "staff"],
    }
  );

  useEffect(() => {
    if (!meSuccess || !managerSuccess) return;
    manager.data?.map((v) => {
      if (v.id === me.id) {
        setIsManger(true);
      }
    });
  }, [manager?.data, managerSuccess, me?.id, meSuccess]);

  useEffect(() => {
    setTabIndex(switchTab(name));
  }, [name]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Flex>
      <Tabs
        variant={"enclosed"}
        flex={1}
        size={"lg"}
        position={"relative"}
        onChange={handleTabsChange}
        index={tabIndex}
      >
        <Button
          position={"absolute"}
          variant={"outline"}
          top={"1"}
          right={"1"}
          display={name === "feed" ? "flex" : "none"}
          rightIcon={<Icon as={MdEdit} mb={"0.5"} />}
          onClick={() => {
            if (name2 === "create")
              router.push(toUrl(PageRoutes.GroupFeed, { id: groupId }));
            else
              router.push(toUrl(PageRoutes.GroupCreateFeed, { id: groupId }));
          }}
        >
          {name2 === "create" ? "돌아가기" : "작성하기"}
        </Button>
        <Button
          position={"absolute"}
          variant={"outline"}
          top={"1"}
          right={"1"}
          display={name === "member" && isManager ? "block" : "none"}
          onClick={() => {
            if (name2 === "permission")
              router.push(toUrl(PageRoutes.GroupMember, { id: groupId }));
            else
              router.push(
                toUrl(PageRoutes.GroupPermissionMember, { id: groupId })
              );
          }}
        >
          {name2 === "permission" ? "돌아가기" : "승인목록"}
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
