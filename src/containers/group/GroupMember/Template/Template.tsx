import { useGetMe, useUpdate } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import { toUrl } from "@/utils";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { TemplateCard } from ".";
import { FaCrown } from "react-icons/fa";

interface TemplateProps {
  groupMembers?: User[];
  header: "운영진" | "그룹원";
  groupId: number;
}

const Template = ({ groupMembers, header, groupId }: TemplateProps) => {
  const [id, setId] = useState<number | null>(null);
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  const { mutate: updateRole } = useUpdate(
    toUrl(ApiRoutes.GroupMembers, {
      id: groupId,
      userId: id,
    })
  );

  const isAdmin = useMemo(() => {
    return (
      groupMembers?.find((member) => member.id === me?.id)?.role === "admin"
    );
  }, [groupMembers, me?.id]);

  const handleRoleChange = useCallback(
    (v: User) => {
      setId(v.id);
      const changedRole = v.role === "member" ? "staff" : "member";
      updateRole(
        {
          role: changedRole,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [toUrl(ApiRoutes.GroupMembers, { id: groupId })],
            });
          },
        }
      );
    },
    [groupId, queryClient, updateRole]
  );

  return (
    <Flex direction={"column"} gap={8}>
      <Heading
        fontSize={"2xl"}
        color={"primary.500"}
        px={4}
        fontWeight={"extrabold"}
      >
        {header}
      </Heading>
      <Grid templateColumns={"repeat(2,1fr)"} gap={2}>
        {groupMembers?.map((member, index) => {
          return (
            <Popover trigger={"click"} key={`${header}_${index}`}>
              <PopoverTrigger>
                <GridItem>
                  <Flex
                    gap={4}
                    alignItems={"center"}
                    boxShadow={"md"}
                    px={2}
                    py={6}
                    borderRadius={8}
                    position={"relative"}
                  >
                    {member.role === "admin" && (
                      <Icon
                        as={FaCrown}
                        position={"absolute"}
                        top={4}
                        left={4}
                        w={"8"}
                        h={"8"}
                        zIndex={1}
                        color={"yellow.500"}
                      />
                    )}
                    <CircleImg
                      imgSrc={member.profile}
                      alt="userImg"
                      size={32}
                    />
                    <TemplateCard user={member} />
                  </Flex>
                </GridItem>
              </PopoverTrigger>
              <PopoverContent width={60}>
                <PopoverHeader>{member.name}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Flex gap={4}>
                    {isAdmin && member.role !== "admin" && (
                      <Button onClick={() => handleRoleChange(member)}>
                        {member.role === "member" ? "직위상승" : "직위강등"}
                      </Button>
                    )}
                    <Button flex={1}>상세페이지</Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Template;
