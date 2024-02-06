import { CreateFeed } from "@/containers";
import GroupDetail from "..";

const post = {
  content: "",
  title: "",
};

const Create = () => {
  return (
    <GroupDetail>
      <CreateFeed post={post} />
    </GroupDetail>
  );
};

export default Create;
