import { ApiRoutes } from "@/constants";
import { useFetch } from "./hooks";
import { toUrl } from "@/utils";
import { ApiResponse } from "./types";
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

export const useGetGroup = (id?: number) => {
  return useFetch<Group>(toUrl(ApiRoutes.Group, { id }));
};
