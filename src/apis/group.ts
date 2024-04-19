import { ApiRoutes } from "@/constants";
import { Group, UserWithPage } from "@/types";
import { toUrl } from "@/utils";
import { useFetch, useUpdate } from "./hooks";
import { getDomain } from "./utils";

interface UseGetGroupMemberParams {
  roles?: string | string[];
  limit?: number;
}

export const useGetGroup = (id?: number) => {
  return useFetch<Group>(toUrl(ApiRoutes.Group, { id }), undefined, {
    enabled: !!id,
  });
};

export const getGroupList = async () => {
  const response = await fetch(getDomain(toUrl(ApiRoutes.GroupList)), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("login-token") || "",
    },
  }).then((res) => res.json());

  return response.data;
};

export const useGetGroupMembers = (
  id: number,
  params?: UseGetGroupMemberParams
) => {
  return useFetch<UserWithPage>(toUrl(ApiRoutes.GroupMembers, { id }), params, {
    enabled: !!id,
    staleTime: 1000,
  });
};

export const useUpateGroup = (id: number) => {
  return useUpdate(toUrl(ApiRoutes.Group, { id }));
};
