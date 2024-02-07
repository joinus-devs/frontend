import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Feed, FeedWithPage } from "@/types";
import { toUrl } from "@/utils";
import { useRouter } from "next/router";
import GroupDetail from ".";
import { GroupFeed } from "@/containers";

const Notice = () => {
  //현재 미구현이라서 임시로 Feed로 대체했습니다.
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

export default Notice;
