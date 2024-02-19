import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed, GroupDetail } from "@/containers";
import { Feed } from "@/types";
import { toUrl } from "@/utils";
import { useRouter } from "next/router";

const Modify = () => {
  const router = useRouter();
  const name = router.query.feedid;
  //ModifyFeed란 컴포넌트를 새로만들어서 button도 등록이 아닌 수정완료 , 해당 버튼을 클릭시에도
  //update가 되도록 변경해줘야함.
  const { data: feed, isSuccess } = useFetch<Feed>(
    toUrl(ApiRoutes.Feeds, { id: name })
  );

  return (
    <GroupDetail>{isSuccess && feed && <CreateFeed feed={feed} />}</GroupDetail>
  );
};

export default Modify;
