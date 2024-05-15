import { useGetFeed, useUpdateFeed } from "@/apis";
import { ApiRoutes, PageRoutes } from "@/constants";
import { QueryParser, toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
import PostFeed, { PostData } from "../PostFeed";

const ModifyFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const feedId = QueryParser.toNumber(router.query.feedid);

  const { data: feed } = useGetFeed(feedId);
  const { mutate } = useUpdateFeed(feedId);

  const delay = (cb: Function) => {
    const setDelay = setTimeout(() => {
      cb();
    }, 2000);
    return () => clearTimeout(setDelay);
  };

  const cb = useCallback(() => {
    delay(async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          toUrl(ApiRoutes.GroupFeed, {
            id: clubId,
          }),
        ],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          toUrl(ApiRoutes.Feeds, {
            id: feedId,
          }),
        ],
      });
    });
  }, [clubId, feedId, queryClient]);

  const onSubmit = (values: PostData) => {
    mutate(values, {
      onSuccess: async () => {
        await cb();
        router.push(
          toUrl(PageRoutes.GroupFeed, {
            id: clubId,
          })
        );
      },
    });
  };

  return (
    <>{feed && <PostFeed onSubmit={onSubmit} feed={feed} type="modify" />}</>
  );
};

export default ModifyFeed;
