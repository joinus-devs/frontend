import { ApiRoutes } from "@/constants";
import { usePost } from ".";

export const usePostImg = () => {
  return usePost(ApiRoutes.Image);
};
