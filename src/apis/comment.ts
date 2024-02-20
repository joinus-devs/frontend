import { toUrl } from "@/utils";
import { useDelete } from "./hooks";
import { ApiRoutes } from "@/constants";

export const useDeleteComment = () => {
  return useDelete(toUrl(ApiRoutes.Comments));
};
