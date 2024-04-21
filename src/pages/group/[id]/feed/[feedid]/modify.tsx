import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed, GroupDetail } from "@/containers";
import ModifyFeed from "@/containers/group/ModifyFeed";
import { Feed } from "@/types";
import { toUrl } from "@/utils";
import { useRouter } from "next/router";

const Modify = () => {
  const router = useRouter();
  const name = router.query.feedid;

  const { data: feed } = useFetch<Feed>(toUrl(ApiRoutes.Feeds, { id: name }));

  return <GroupDetail>{feed && <ModifyFeed />}</GroupDetail>;
};

export default Modify;
