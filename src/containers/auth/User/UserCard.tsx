import { UserInfo } from "@/containers";
import { User } from "@/types";
import { Flex, Heading } from "@chakra-ui/react";
import UpdateUserForm from "./UpdateUserForm";

interface UserCardProps {
  data: User;
}

const UserCard = ({ data }: UserCardProps) => {
  return (
    <Flex direction={"column"}>
      <Heading size="md" px={8}>
        {data?.name}의 프로필
      </Heading>
      <Flex gap={2} direction={{ base: "column", md: "row" }}>
        <UpdateUserForm user={data} />
        <UserInfo user={data} />
      </Flex>
    </Flex>
  );
};
export default UserCard;
