import { ApiRoutes } from "@/constants";
import { Group, User } from "@/types";
import { toUrl } from "@/utils";
import { CursorQueryParams, Scheme, useDelete, useLoadMore, usePost } from ".";

export interface Feed extends Scheme {
  club_id: number;
  content: string;
  title: string;
  user: User;
  user_id: number;
  is_private: boolean;
  comment_count: number;
  club?: Group;
}

export interface GetGroupFeedsParams extends CursorQueryParams {
  clubId?: number;
}

export interface PostFeedParams {
  title: string;
  content: string;
  clubId: number;
  isPrivate: boolean;
}

export const useDeleteFeed = () => {
  return useDelete(toUrl(ApiRoutes.Feeds));
};

export const useGetGroupFeeds = (params: GetGroupFeedsParams) => {
  const { clubId, ...rest } = params;
  return useLoadMore<Feed[]>(toUrl(ApiRoutes.GroupFeed, { id: clubId }), rest, {
    enabled: !!clubId,
  });
};

export const useGetFeeds = (params: CursorQueryParams) => {
  return useLoadMore<Feed[]>(toUrl(ApiRoutes.Feeds), params);
};

// export const usePostFeed = (params:) => {
//   return usePost(toUrl(ApiRoutes.Feeds));
// }
