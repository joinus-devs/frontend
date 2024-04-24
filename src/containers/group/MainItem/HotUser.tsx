import { useGetUser } from "@/apis";
import { UserCard } from "@/containers";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const HotUser = () => {
  const { data: user1 } = useGetUser(53);
  const { data: user2 } = useGetUser(10);
  const concatData = [];
  if (user1) concatData.push(user1);
  if (user2) concatData.push(user2);

  return (
    <Flex gap={8} direction={"column"}>
      <Flex gap={2} alignItems={"center"}>
        <Icon as={FaHeart} color={"red"} w={"6"} h={"6"} />
        <Heading size={"md"}>화재의 사람들 </Heading>
      </Flex>

      {concatData.map((user, index) => {
        return <UserCard data={user} key={`usercard_${index}`} />;
      })}
    </Flex>
  );
};

export default HotUser;
