import { useFetch } from "@/apis";
import { useRouter } from "next/router";
import { Feed as _Feed } from "@/types";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { GroupFeed } from "@/containers";
import GroupDetail from "..";

const Feed = () => {
  const router = useRouter();
  const numberingQueryId = Number(router.query.id);
  const { data: feeds, isSuccess } = useFetch<_Feed[]>(
    toUrl(ApiRoutes.GroupFeed, { id: numberingQueryId })
  );
  return (
    <GroupDetail>
      {isSuccess && feeds && (
        <GroupFeed feeds={feeds} groupId={numberingQueryId} />
      )}
    </GroupDetail>
  );
};

export default Feed;
