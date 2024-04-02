import { useGetGroupMembers } from "@/apis";
import { FormatMemberValue, formatGroupMembers } from "@/utils/group";
import { useMemo } from "react";

const useFormatMembers = (groupId: number) => {
  const { data: members } = useGetGroupMembers(groupId, {
    roles: ["admin", "staff", "member"],
    limit: 50,
  });
  const formatData = useMemo(() => {
    return formatGroupMembers(members?.data || []);
  }, [members?.data]);

  return formatData;
};

export default useFormatMembers;
