import { ApiRoutes } from "@/constants";
import { Category, Group, User, WithPage } from "@/types";
import { toUrl } from "@/utils";
import { useFetch, useLoadMore, useUpdate } from "./hooks";
import { CursorQueryParams } from "./types";
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

export const useGetGroups = (params: CursorQueryParams) => {
  return useLoadMore<Group[]>(toUrl(ApiRoutes.Group), params);
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
  id?: number,
  params?: UseGetGroupMemberParams
) => {
  return useFetch<WithPage<User>>(
    toUrl(ApiRoutes.GroupMembers, { id }),
    params,
    {
      enabled: !!id,
      staleTime: 1000,
    }
  );
};

export const useUpateGroup = (id: number) => {
  return useUpdate(toUrl(ApiRoutes.Group, { id }));
};

export const useGetCategories = () => {
  return useFetch<Category[]>(toUrl(ApiRoutes.Category));
};

export const useGetGroupByCategory = (
  id: number,
  params: CursorQueryParams
) => {
  console.log(id);
  return useLoadMore<Group[]>(toUrl(ApiRoutes.GroupByCategory, { id }), params);
};
