import { Feed } from "@/types";
import { GroupFeedItem } from "./GroupFeedItem";

interface CreateProp {
  feeds: Feed[];
  groupId: number;
}

const GroupFeed = ({ feeds, groupId }: CreateProp) => {
  return (
    <>
      {feeds.map((feed, index) => (
        <GroupFeedItem feed={feed} key={`feed_${index}`} groupId={groupId} />
      ))}
    </>
  );
};
export default GroupFeed;
