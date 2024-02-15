import { ApiRoutes } from "@/constants";
import { Group, UserWithPage } from "@/types";
import { toUrl } from "@/utils";
import { useFetch } from "./hooks";

export const useGetGroup = (id?: number) => {
  return useFetch<Group>(toUrl(ApiRoutes.Group, { id }));
};

export const useGetGroupMembers = (id: number, params?: object) => {
  return useFetch<UserWithPage>(toUrl(ApiRoutes.GroupMembers, { id }), params);
};
