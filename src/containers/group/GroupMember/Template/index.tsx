import { useUpdate } from "@/apis";
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
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface TemplateProps {
  groupMember?: User[];
  header: string;
  groupId: number;
  admin: boolean;
}

export const Template = ({
  groupMember,
  header,
  groupId,
  admin,
}: TemplateProps) => {
  const [id, setId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { mutate: updateRole } = useUpdate(
    toUrl(ApiRoutes.GroupMembers, {
      id: groupId,
      userId: id,
    })
  );

  const handlerRoleChange = async (v: User) => {
    await setId(v.id);
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
  };

  return (
    <Flex direction={"column"} gap={8}>
      <Grid templateColumns={"repeat(4,1fr)"}>
        <GridItem>
          <Heading fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
            {header}
          </Heading>
        </GridItem>
      </Grid>
      <Grid pb={8} templateColumns={"repeat(4,1fr)"} rowGap={12}>
        {groupMember?.map((v, index) => {
          return (
            <Popover trigger={"click"} key={`${header}_${index}`}>
              <PopoverTrigger>
                <GridItem>
                  <Flex
                    direction={"column"}
                    w={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={4}
                  >
                    <CircleImg
                      imgSrc={"/noneUserImg.webp"}
                      alt="userImg"
                      size={24}
                    />
                    <Text>{v.name}</Text>
                  </Flex>
                </GridItem>
              </PopoverTrigger>
              <PopoverContent width={60}>
                <PopoverHeader>{v.name}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Flex gap={4}>
                    {admin && v.role !== "admin" && (
                      <Button onClick={() => handlerRoleChange(v)} flex={1}>
                        {v.role === "member" ? "직위상승" : "직위강등"}
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
