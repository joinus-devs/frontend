import { useGetGroupMembers, useGetMe } from "@/apis";
import { PageRoutes, groupNavs } from "@/constants";
import { toUrl } from "@/utils";
import { Button, Flex, Icon, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

interface GroupNavProps {
  groupId: number;
}

const GroupNav = ({ groupId }: GroupNavProps) => {
  const [isManager, setIsManger] = useState(false);
  const router = useRouter();

  const isFeedPage =
    PageRoutes.GroupFeed.match(router.pathname) ||
    PageRoutes.GroupCreateFeed.match(router.pathname) ||
    PageRoutes.GroupModifyFeed.match(router.pathname);
  const isMemberPage =
    PageRoutes.GroupMember.match(router.pathname) ||
    PageRoutes.GroupPermissionMember.match(router.pathname);
  const isCreatePage = PageRoutes.GroupCreateFeed.match(router.pathname);
  const isPermissionPage = PageRoutes.GroupPermissionMember.match(
    router.pathname
  );

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

  return (
    <Flex>
      <Tabs
        variant={"enclosed"}
        flex={1}
        size={"lg"}
        position={"relative"}
        tabIndex={groupNavs.findIndex((v) => {
          return (
            v.path.match(router.pathname) ||
            v.subPaths.some((subPath) => subPath.match(router.pathname))
          );
        })}
      >
        <Button
          position={"absolute"}
          variant={"outline"}
          top={"1"}
          right={"1"}
          display={isFeedPage ? "flex" : "none"}
          rightIcon={<Icon as={MdEdit} mb={"0.5"} />}
          onClick={() => {
            if (isCreatePage)
              router.push(toUrl(PageRoutes.GroupFeed, { id: groupId }));
            else
              router.push(toUrl(PageRoutes.GroupCreateFeed, { id: groupId }));
          }}
        >
          {isCreatePage ? "돌아가기" : "작성하기"}
        </Button>
        <Button
          position={"absolute"}
          variant={"outline"}
          top={"1"}
          right={"1"}
          display={isMemberPage && isManager ? "block" : "none"}
          onClick={() => {
            if (isPermissionPage)
              router.push(toUrl(PageRoutes.GroupMember, { id: groupId }));
            else
              router.push(
                toUrl(PageRoutes.GroupPermissionMember, { id: groupId })
              );
          }}
        >
          {isPermissionPage ? "돌아가기" : "승인목록"}
        </Button>
        <TabList>
          {groupNavs.map((v, i) => {
            return (
              <Tab
                key={`groupnav_${i}`}
                fontWeight={"bold"}
                fontSize={"lg"}
                as={"button"}
                onClick={() =>
                  router.push({ pathname: toUrl(v.path, { id: groupId }) })
                }
              >
                {v.label}
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default GroupNav;
