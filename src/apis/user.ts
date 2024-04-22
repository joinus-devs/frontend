import { User } from "@/types";
import { useFetch } from ".";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }), undefined, {
    enabled: !!id,
  });
};
