import { useGetGroupMembers } from "@/apis";
import { formatGroupMembers } from "@/utils/group";
import { useMemo } from "react";

const useFormatMembers = (groupId: number) => {
  const { data: members } = useGetGroupMembers(groupId, {
    roles: ["admin", "staff", "member"],
    limit: 50,
  });

  return useMemo(() => {
    return formatGroupMembers(members?.data || []);
  }, [members?.data]);
};

export default useFormatMembers;
