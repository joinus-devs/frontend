import { useGetGroupFeeds } from "@/apis/feed";
import { InfiniteList } from "@/components";
import { GroupDetail, GroupFeedItem } from "@/containers";
import { Feed } from "@/types";
import { QueryParser } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";

const FeedPage = () => {
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const router = useRouter();

  return (
    <GroupDetail>
      <InfiniteList<Feed>
        infiniteQueryResult={useGetGroupFeeds({
          clubId: QueryParser.toNumber(router.query.id),
          limit: 10,
        })}
        renderItem={GroupFeedItem}
        dynamicHeight={-dynamicHeight}
        setDynamicHeight={setDynamicHeight}
      />
    </GroupDetail>
  );
};

export default FeedPage;
