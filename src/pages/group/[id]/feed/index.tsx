import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { GroupFeed } from "@/containers";
import { FeedWithPage } from "@/types";
import { toUrl } from "@/utils";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import GroupDetail from "..";
import { Feed as _Feed } from "@/types";

const Feed = () => {
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [feedData, setFeedData] = useState<_Feed[]>([]);
  const [btScroll, setBtScroll] = useState(0);
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: feeds, isSuccess } = useFetch<FeedWithPage>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId }),
    {
      cursor: !!cursor ? cursor : undefined,
      limit: 10,
    }
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = async () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollHeight - scrollTop === clientHeight && !!feeds?.next) {
          await setCursor(feeds?.next);
          await setBtScroll(scrollHeight - clientHeight);
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [cursor, feeds?.next]);

  useEffect(() => {
    if (!feeds || !isSuccess) return;
    setFeedData((prev) => [...prev, ...feeds.data]);
  }, [feeds, feeds?.data, isSuccess]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = btScroll;
  }, [btScroll, feedData]);
  return (
    <GroupDetail>
      {isSuccess && feeds && (
        <Flex
          direction={"column"}
          gap={4}
          ref={containerRef}
          maxH={1000}
          overflowY={"auto"}
          p={4}
        >
          <GroupFeed feeds={feedData} groupId={numberingQueryId} />
        </Flex>
      )}
    </GroupDetail>
  );
};

export default Feed;
