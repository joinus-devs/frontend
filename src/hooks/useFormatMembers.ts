import { useGetGroupMembers } from "@/apis";
import { formatGroupMembers } from "@/utils/group";

const useFormatMembers = (groupId: number) => {
  const { data: members } = useGetGroupMembers(groupId, {
    roles: ["admin", "staff", "member"],
    limit: 50,
  });
  const formatData = formatGroupMembers(members?.data || []);
  return formatData;
};

export default useFormatMembers;
