import { usePostFeed } from "@/apis/feed";
import { ApiRoutes, PageRoutes } from "@/constants";
import { QueryParser, toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PostFeed, { PostData } from "../PostFeed";
import { useCallback } from "react";

const CreateFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const { mutate } = usePostFeed(clubId);

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
    });
  }, [clubId, queryClient]);

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
  return <PostFeed onSubmit={onSubmit} type="create" />;
};

export default CreateFeed;
