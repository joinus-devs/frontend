import { Group, User, WithPage } from "@/types";
import { useFetch } from ".";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

interface GetUserGroupResponse extends Group {
  user: User;
}

export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }), undefined, {
    enabled: !!id,
  });
};

export const useGetUserGroups = (id?: number) => {
  return useFetch<WithPage<GetUserGroupResponse>>(
    toUrl(ApiRoutes.UserGroups, { id }),
    undefined,
    {
      enabled: !!id,
    }
  );
};
