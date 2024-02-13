import { Feed } from "@/types";
import { Flex } from "@chakra-ui/react";
import { GroupFeedItem } from "./GroupFeedItem";
import { useEffect, useRef } from "react";

interface CreateProp {
  feeds: Feed[];
  groupId: number;
}

const GroupFeed = ({ feeds, groupId }: CreateProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    function handleScroll() {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // 스크롤이 맨 아래에 위치하고 있는지 체크
        if (scrollHeight - scrollTop === clientHeight) {
          console.log("맨 아래에 도달했습니다!");
        }
      }
    }
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      ref={containerRef}
      direction={"column"}
      gap={4}
      p={4}
      pb={8}
      maxH={1000}
      overflowY={"auto"}
    >
      {feeds.map((feed, index) => (
        <GroupFeedItem feed={feed} key={`feed_${index}`} groupId={groupId} />
      ))}
    </Flex>
  );
};
export default GroupFeed;
