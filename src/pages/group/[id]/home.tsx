import { useGetGroup, useGetMe } from "@/apis";
import { GroupChat, GroupDetail } from "@/containers";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const { data: group, isSuccess } = useGetGroup(Number(router.query.id));

  return (
    <GroupDetail>
      {isSuccess && group && <GroupChat group={group} />}
    </GroupDetail>
  );
};

export default Home;
