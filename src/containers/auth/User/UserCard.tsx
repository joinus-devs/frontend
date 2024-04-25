import { UserInfo } from "@/containers";
import { User } from "@/types";
import { Flex } from "@chakra-ui/react";
import UpdateUserForm from "./UpdateUserForm";

interface UserCardProps {
  data: User;
}

const UserCard = ({ data }: UserCardProps) => {
  return (
    <Flex gap={2} direction={{ base: "column", md: "row" }}>
      <UpdateUserForm user={data} />
      <UserInfo user={data} />
    </Flex>
  );
};
export default UserCard;
