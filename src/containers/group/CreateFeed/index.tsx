import { usePostFeed } from "@/apis/feed";
import { ApiRoutes, PageRoutes } from "@/constants";
import { Feed } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PostFeed, { PostData } from "../PostFeed";

const CreateFeed = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const { mutate } = usePostFeed(clubId);

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
  return <PostFeed onSubmit={onSubmit} type="create" />;
};

export default CreateFeed;
