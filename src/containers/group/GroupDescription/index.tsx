import { usePost } from "@/apis";
import { ApiRoutes, PageRoutes, toCategory } from "@/constants";
import { useUserRoleMatcher } from "@/hooks";
import { Group } from "@/types";
import { toUrl } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IoIosSettings } from "react-icons/io";

interface GroupDescriptionProps {
  group?: Group;
}

const GroupDescription = ({ group }: GroupDescriptionProps) => {
  const router = useRouter();
  const numberingQuery = Number(router.query.id);

  const { mutate: joinClub } = usePost(
    toUrl(ApiRoutes.GroupMembers, { id: numberingQuery })
  );
  const handlerJoin = useCallback(() => {
    joinClub({});
  }, [joinClub]);

  return (
    <Box p={8} position={"relative"}>
      {useUserRoleMatcher(group?.id ?? 0, ["admin"]) && (
        <Tooltip label="그룹설정" placement={"bottom-end"}>
          <Flex
            position={"absolute"}
            top={4}
            right={0}
            as={"button"}
            onClick={() =>
              router.push(toUrl(PageRoutes.GroupSetting, { id: group?.id }))
            }
          >
            <Icon as={IoIosSettings} fontSize={24} />
          </Flex>
        </Tooltip>
      )}
      {!useUserRoleMatcher(group?.id ?? 0, [
        "member",
        "banned",
        "staff",
        "pending",
        "admin",
      ]) && (
        <Button position={"absolute"} top={4} right={0} onClick={handlerJoin}>
          가입하기
        </Button>
      )}
      {useUserRoleMatcher(group?.id ?? 0, ["pending"]) && (
        <Tag
          position={"absolute"}
          top={4}
          right={0}
          size={"lg"}
          variant={"solid"}
          colorScheme="primary"
          fontWeight={"semibold"}
          fontSize={16}
        >
          승인대기중..
        </Tag>
      )}
      <Flex>
        <Heading size={"lg"} p={4} pb={8}>
          {group?.name ?? ""}
        </Heading>
        {group?.categories?.map((category, index) => {
          return (
            <Tag
              p={4}
              h={8}
              fontSize={16}
              key={index}
              fontWeight={"semibold"}
              mr={2}
              variant={"outline"}
              border={"1px solid"}
            >
              {toCategory[category]}
            </Tag>
          );
        })}
      </Flex>
      <Text fontSize={"lg"} pl={4}>
        {group?.description ?? ""}
      </Text>
    </Box>
  );
};

export default GroupDescription;
