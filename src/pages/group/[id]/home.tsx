import { GroupChat } from "@/containers";
import GroupDetail from ".";
import { useGetGroup } from "@/apis";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { data: group, isSuccess } = useGetGroup(Number(router.query.id));
  return (
    <GroupDetail>
      {isSuccess && group && <GroupChat group={group} />}
    </GroupDetail>
  );
};

export default Home;
