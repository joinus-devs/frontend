import { useDelete, useFetch, useUpdate } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { UserWithPage } from "@/types";
import { toUrl } from "@/utils";
import { formatISO } from "@/utils/date";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import GroupDetail from "..";

const Permission = () => {
  const [permissionUser, setPermissionUser] = useState<number | null>(null);
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const queryClient = useQueryClient();

  const { data: pendingMembers, isSuccess } = useFetch<UserWithPage>(
    toUrl(ApiRoutes.GroupMembers, { id: numberingQueryId }),
    { roles: "pending" }
  );

  const { mutate: permission } = useUpdate(
    toUrl(ApiRoutes.GroupMembers, {
      id: numberingQueryId,
      userId: permissionUser,
    })
  );

  const { mutate: reject } = useDelete(
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

  const handlerReject = async (userId: number) => {
    await setPermissionUser(userId);
    reject(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [toUrl(ApiRoutes.GroupMembers, { id: numberingQueryId })],
        });
      },
    });
  };

  return (
    <GroupDetail>
      {isSuccess && pendingMembers && (
        <Flex direction={"column"} gap={4}>
          {pendingMembers.data.map((member, index) => {
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
                  <Button onClick={() => handlerReject(member.id)}>거절</Button>
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
