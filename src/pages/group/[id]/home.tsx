import { useGetGroup, useGetGroupMembers, useGetMe } from "@/apis";
import { ExclusiveAccessAlert } from "@/components";
import { GroupChat, GroupDetail } from "@/containers";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const { data: group, isSuccess } = useGetGroup(clubId ?? 0);
  const { data: members } = useGetGroupMembers(clubId ?? 0, {
    roles: ["member", "admin", "staff"],
  });
  const { data: me } = useGetMe();
  const isMember = members?.data?.some((member) => member.id === me?.id);

  return (
    <GroupDetail>
      {isSuccess &&
        group &&
        (isMember ? (
          <GroupChat group={group} />
        ) : (
          <ExclusiveAccessAlert text="그룹원만 참여가능한 채팅방 입니다." />
        ))}
    </GroupDetail>
  );
};

export default Home;
