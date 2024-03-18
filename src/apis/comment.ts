import { toUrl } from "@/utils";
import { useDelete } from "./hooks";
import { ApiRoutes } from "@/constants";
import { CursorQueryParams } from ".";
import { Comment } from "@/types";
import { useLoadMore } from ".";

export interface useGetCommentsParams extends CursorQueryParams {
  feedId?: number;
}
export const useDeleteComment = () => {
  return useDelete(toUrl(ApiRoutes.Comments));
};

export const useGetComment = (params: useGetCommentsParams) => {
  const { feedId, ...rest } = params;
  return useLoadMore<Comment[]>(
    toUrl(ApiRoutes.FeedInComments, { id: feedId }),
    rest,
    {
      enabled: !!feedId,
    }
  );
};
