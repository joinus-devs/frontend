import { useFetch, useGetGroupMembers } from "@/apis";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import { useMemo } from "react";

const useUserRoleMatcher = (groupId: number, role: string[]) => {
  const { data: roleData, isSuccess: memberSuccess } = useGetGroupMembers(
    groupId,
    {
      roles: role,
    }
  );
  const { data: me, isSuccess: meSuccess } = useFetch<User>(ApiRoutes.Me);
  const booleanValue = useMemo(() => {
    if (!meSuccess || !memberSuccess) return false;
    return roleData.data.some((v) => v.id === me?.id);
  }, [me?.id, meSuccess, memberSuccess, roleData?.data]);

  return booleanValue;
};

export default useUserRoleMatcher;
