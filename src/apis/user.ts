import { ApiRoutes } from "@/constants";
import { User, UserGroups } from "@/types";
import { toUrl } from "@/utils";
import { CursorQueryParams, useFetch, useLoadMore } from ".";

export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }), undefined, {
    enabled: !!id,
  });
};

export const useGetUserGroups = (id: number, params: CursorQueryParams) => {
  return useLoadMore<UserGroups[]>(toUrl(ApiRoutes.UserGroups, { id }), params);
};
