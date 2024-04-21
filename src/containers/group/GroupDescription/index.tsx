import { usePost } from "@/apis";
import { ApiRoutes, PageRoutes, toCategory } from "@/constants";
import { useUserRoleMatcher } from "@/hooks";
import { Group } from "@/types";
import { QueryParser, toUrl } from "@/utils";
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
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { IoIosSettings } from "react-icons/io";

interface GroupDescriptionProps {
  group: Group;
}

const none = "/none-groupimg.webp";

const GroupDescription = ({ group }: GroupDescriptionProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const groupId = QueryParser.toNumber(router.query.id);

  const { mutate: joinClub } = usePost(
    toUrl(ApiRoutes.GroupMembers, { id: groupId ?? 0 })
  );
  const handlerJoin = useCallback(() => {
    joinClub(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.GroupMembers, { id: groupId })],
          });
        },
      }
    );
  }, [groupId, joinClub, queryClient]);

  const mainGroupImg = useMemo(() => {
    if (!group || !group.images) return none;
    if (group.images.length === 0) return none;
    const main = group.images.find((image) => image.type === "main");
    if (!main) return none;
    return main.url;
  }, [group]);

  return (
    <>
      <Box
        w={"100%"}
        h={200}
        overflow={"hidden"}
        position={"relative"}
        shadow={"lg"}
      >
        <Image
          src={mainGroupImg}
          alt="groupImg"
          fill
          sizes="100%"
          priority
          objectFit="cover"
        />
      </Box>
      <Flex direction={"column"} gap={"4"} px={"2"} py={"8"}>
        {useUserRoleMatcher(group.id, ["admin"]) && (
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

        <Flex justify={"space-between"}>
          <Flex gap={"4"}>
            <Heading size={"lg"}>{group.name ?? ""}</Heading>
            <Flex gap={"2"}>
              {group.categories.map((category, index) => {
                return (
                  <Tag h={8} key={index} variant={"outline"} size={"md"}>
                    {toCategory[category]}
                  </Tag>
                );
              })}
            </Flex>
          </Flex>
          {!useUserRoleMatcher(group.id, [
            "member",
            "banned",
            "staff",
            "pending",
            "admin",
          ]) && <Button onClick={handlerJoin}>가입하기</Button>}
          {useUserRoleMatcher(group.id, ["pending"]) && (
            <Tag
              size={"lg"}
              variant={"solid"}
              colorScheme="primary"
              fontWeight={"semibold"}
              fontSize={16}
            >
              승인대기중..
            </Tag>
          )}
        </Flex>
        <Text fontSize={"lg"}>{group.description ?? ""}</Text>
      </Flex>
    </>
  );
};

export default GroupDescription;
