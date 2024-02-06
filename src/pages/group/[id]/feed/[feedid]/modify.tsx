import { CreateFeed } from "@/containers";
import GroupDetail from "../..";
import { useRouter } from "next/router";
import { useFetch } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";
import { Feed } from "@/types";

const Modify = () => {
  const router = useRouter();
  const name = router.query.feedid;
  //ModifyFeed란 컴포넌트를 새로만들어서 button도 등록이 아닌 수정완료 , 해당 버튼을 클릭시에도
  //update가 되도록 변경해줘야함.
  const { data: feed, isSuccess } = useFetch<Feed>(
    toUrl(ApiRoutes.Feeds, { id: name })
  );

  const post = {
    title: feed!.title,
    content: feed!.content,
  };

  return (
    <GroupDetail>{isSuccess && feed && <CreateFeed post={post} />}</GroupDetail>
  );
};

export default Modify;
