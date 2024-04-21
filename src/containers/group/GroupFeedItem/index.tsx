import { FeedBody, FeedExtra } from "@/containers/feed";
import { useBgColor } from "@/hooks";
import { Feed } from "@/types";
import { Card } from "@chakra-ui/react";

interface GroupFeedItemProps {
  data: Feed;
}

const GroupFeedItem = ({ data }: GroupFeedItemProps) => {
  const bgColor = useBgColor();

  return (
    <Card direction={"column"} backgroundColor={bgColor} p={"4"}>
      <FeedBody feed={data} />
      <FeedExtra feed={data} />
    </Card>
  );
};

export default GroupFeedItem;
