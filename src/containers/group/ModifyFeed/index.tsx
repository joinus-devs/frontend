import { usePostFeed, useUpdateFeed } from "@/apis/feed";
import { ApiRoutes, PageRoutes } from "@/constants";
import { Feed } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PostFeed, { PostData } from "../PostFeed";

interface ModifyFeedProps {
  feed: Feed;
}

const ModifyFeed = ({ feed }: ModifyFeedProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const { mutate } = useUpdateFeed(feed.id);

  const onSubmit = (values: PostData) => {
    mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [
            toUrl(ApiRoutes.GroupFeed, {
              id: clubId,
            }),
          ],
        });
        router.push(
          toUrl(PageRoutes.GroupFeed, {
            id: clubId,
          })
        );
      },
    });
  };

  return <PostFeed onSubmit={onSubmit} feed={feed} type="modify" />;
};

export default ModifyFeed;
