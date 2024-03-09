import { useGetGroupFeeds } from "@/apis/feed";
import { WindowVirtualList } from "@/components/common/DynamicInfiniteList";
import { GroupDetail, GroupFeedItem } from "@/containers";
import { Feed } from "@/types";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";

const FeedPage = () => {
  const router = useRouter();
  return (
    <GroupDetail>
      <WindowVirtualList<Feed>
        infiniteQueryResult={useGetGroupFeeds({
          clubId: QueryParser.toNumber(router.query.id),
          limit: 10,
        })}
        renderItem={GroupFeedItem}
        gap={20}
      />
    </GroupDetail>
  );
};

export default FeedPage;
