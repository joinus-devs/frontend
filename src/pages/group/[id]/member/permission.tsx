import { useRouter } from "next/router";
import GroupDetail from "..";
import { useFetch, useUpdate } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { User } from "@/types";
import { CircleImg } from "@/components";
import { formatISO } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const Permission = () => {
  const [permissionUser, setPermissionUser] = useState<number | null>(null);
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const queryClient = useQueryClient();
  const { data: pendingMembers, isSuccess } = useFetch<User[]>(
    toUrl(ApiRoutes.GroupMembers, { id: numberingQueryId }),
    { roles: "pending" }
  );
  const { mutate: permission } = useUpdate(
    toUrl(ApiRoutes.GroupMembers, {
      id: numberingQueryId,
      userId: permissionUser,
    })
  );

  const handlerPermission = async (userId: number) => {
    await setPermissionUser(userId);
    permission(
      {
        role: "member",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.GroupMembers, { id: numberingQueryId })],
          });
        },
      }
    );
  };

  return (
    <GroupDetail>
      {isSuccess && pendingMembers && (
        <Flex direction={"column"} gap={4}>
          {pendingMembers.map((member, index) => {
            return (
              <Flex
                key={`member_${index}`}
                p={8}
                boxShadow={"lg"}
                borderRadius={12}
                gap={4}
                alignItems={"center"}
                position={"relative"}
              >
                <CircleImg
                  imgSrc={"/noneUserImg.webp"}
                  alt={`user_img`}
                  size={24}
                />
                <Flex direction={"column"} gap={2} minW={250}>
                  <Heading size={"md"}>{member.name}</Heading>
                  <Flex>
                    <Flex direction={"column"} flex={1}>
                      <Text fontWeight={"bold"}>성별</Text>
                      <Text fontWeight={"bold"}>가입일</Text>
                    </Flex>
                    <Flex direction={"column"} flex={2}>
                      <Text>{member.sex ? "남성" : "여성"}</Text>
                      <Text>{formatISO(member.created_at)}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex gap={2} position={"absolute"} right={0} top={4}>
                  <Button onClick={() => handlerPermission(member.id)}>
                    승인
                  </Button>
                  <Button>거절</Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      )}
    </GroupDetail>
  );
};

export default Permission;
