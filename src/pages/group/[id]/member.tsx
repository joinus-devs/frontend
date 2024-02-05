import { GroupChat, GroupMember } from "@/containers";
import GroupDetail from ".";
import { useGetGroup, useGetGroupMembers } from "@/apis";
import { useRouter } from "next/router";

const Member = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: member, isSuccess } = useGetGroupMembers(numberingQueryId);

  return (
    <GroupDetail>
      {isSuccess && member && <GroupMember member={member} />}
    </GroupDetail>
  );
};

export default Member;
