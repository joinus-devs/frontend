import { GroupChat, GroupMember } from "@/containers";
import GroupDetail from ".";
import { useGetGroup, useGetGroupMembers } from "@/apis";
import { useRouter } from "next/router";

const Member = () => {
  const router = useRouter();
  return (
    <GroupDetail>
      <GroupMember />
    </GroupDetail>
  );
};

export default Member;
