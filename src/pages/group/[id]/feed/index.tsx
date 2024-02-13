import { useFetch, useLoadMore } from "@/apis";
import { useRouter } from "next/router";
import { FeedWithPage } from "@/types";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { GroupFeed } from "@/containers";
import GroupDetail from "..";
import { useEffect, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";

const Feed = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: feeds, isSuccess } = useFetch<FeedWithPage>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId }),
    {
      cursor: 10,
      limit: 10,
    }
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    function handleScroll() {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop === clientHeight) {
          console.log("데이터요청");
        }
      }
    }
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <GroupDetail>
      {isSuccess && feeds && (
        <Box ref={containerRef}>
          <GroupFeed feeds={feeds.data} groupId={numberingQueryId} />
        </Box>
      )}
    </GroupDetail>
  );
};

export default Feed;
