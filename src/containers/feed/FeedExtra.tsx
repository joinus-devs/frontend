import { Feed } from "@/types";
import { FeedSocialCount, FeedCommentForm } from ".";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";

interface FeedExtraProps {
  feed: Feed;
}

const FeedExtra = ({ feed }: FeedExtraProps) => {
  const router = useRouter();

  return (
    <Flex
      direction={"column"}
      gap={"4"}
      onClick={() => router.push(toUrl(PageRoutes.Feed, { id: feed.id }))}
    >
      <FeedSocialCount commentCount={feed.comment_count} likeCount={0} />
      <FeedCommentForm feedId={feed.id} />
    </Flex>
  );
};

export default FeedExtra;
