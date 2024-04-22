import { useGetUser } from "@/apis";
import { UserInfo } from "@/containers";
import { QueryParser } from "@/utils";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import UpdateUserForm from "./UpdateUserForm";

const UserCard = () => {
  const router = useRouter();
  const userId = QueryParser.toNumber(router.query.id);
  const { data: userData } = useGetUser(userId);

  return (
    <Flex direction={"column"}>
      <Heading size="md">{userData?.name}의 프로필</Heading>
      {userData && (
        <Flex gap={2}>
          <UpdateUserForm user={userData} />
          <UserInfo user={userData} />
        </Flex>
      )}
    </Flex>
  );
};
export default UserCard;
