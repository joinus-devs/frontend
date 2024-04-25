import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFetch } from "@/apis";
import { Feed, WithPage } from "@/types";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { GroupFeedItem } from "..";

const GroupNotice = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: feeds, isSuccess } = useFetch<WithPage<Feed>>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId })
  );

  //GroupFeedItem을 재활용해서 사용할 수 있을 것 같음.
  //type을 분류해서 사용하면 될 것 같음.
  return (
    <Box>
      <Flex direction={"column"} gap={4} p={4}>
        {feeds?.data.map((feed, index) => (
          <GroupFeedItem data={feed} key={`notice_${index}`} />
        ))}
      </Flex>
    </Box>
  );
};
export default GroupNotice;
