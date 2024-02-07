import { useFetch } from "@/apis";
import { useRouter } from "next/router";
import { FeedWithPage } from "@/types";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { GroupFeed } from "@/containers";
import GroupDetail from "..";

const Feed = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: feeds, isSuccess } = useFetch<FeedWithPage>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId })
  );
  return (
    <GroupDetail>
      {isSuccess && feeds && (
        <GroupFeed feeds={feeds.data} groupId={numberingQueryId} />
      )}
    </GroupDetail>
  );
};

export default Feed;
