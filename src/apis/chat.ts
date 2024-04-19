import { ApiResponseChat } from "@/types/chat";
import { useLoadMore } from "./hooks";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { CursorQueryParams } from "./types";

export interface GetGroupChatsParams extends CursorQueryParams {
  groupId?: number;
}

export const useGetGroupChat = (params: GetGroupChatsParams) => {
  const { groupId, ...rest } = params;
  return useLoadMore<ApiResponseChat[]>(
    toUrl(ApiRoutes.Chat, { id: groupId ?? 0 }),
    rest,
    {
      enabled: !!groupId,
    }
  );
};
