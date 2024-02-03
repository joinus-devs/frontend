import { ApiRoutes } from "@/constants";
import { useFetch, usePost } from "./hooks";
import { toUrl } from "@/utils";
import { ApiResponse } from "./types";
import { User } from "@/types";
interface Group {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  description: string;
  capacity: number;
  sex: boolean;
  minimum_age: number;
  maximum_age: number;
  categories: string[];
}

interface FeedCreate {
  title: string;
  content: string;
}
export const useGetGroup = (id?: number) => {
  return useFetch<Group>(toUrl(ApiRoutes.Group, { id }));
};

export const useGetGroupMembers = (id: number) => {
  return useFetch<User[]>(toUrl(ApiRoutes.GroupMembers, { id }));
};
