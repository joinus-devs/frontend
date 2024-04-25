import { useGetUserGroups } from "@/apis";
import { WindowVirtualList } from "@/components";
import { User, UserGroups } from "@/types";
import { Flex, Heading } from "@chakra-ui/react";
import { GroupCard } from "@/containers";

interface UserGroupCardProps {
  user: User;
}

const UserGroup = ({ user }: UserGroupCardProps) => {
  return (
    <Flex direction={"column"} gap={2}>
      <Heading size="md" px={4}>
        {user.name} 님이 참여중인 그룹
      </Heading>
      <WindowVirtualList<UserGroups>
        infiniteQueryResult={useGetUserGroups(user.id, { limit: 10 })}
        renderItem={GroupCard}
        emptyDataMessage="참여중인 그룹이 없습니다."
      />
    </Flex>
  );
};
export default UserGroup;
