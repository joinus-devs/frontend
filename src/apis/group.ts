import { ApiRoutes } from "@/constants";
import { Group, User } from "@/types";
import { toUrl } from "@/utils";
import { useFetch } from "./hooks";

export const useGetGroup = (id?: number) => {
  return useFetch<Group>(toUrl(ApiRoutes.Group, { id }));
};

export const useGetGroupMembers = (id: number, params?: object) => {
  return useFetch<User[]>(toUrl(ApiRoutes.GroupMembers, { id }), params);
};
