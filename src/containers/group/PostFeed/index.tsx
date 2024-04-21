import { Feed } from "@/types";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";

export interface PostData {
  title: string;
  content: string;
  is_private: boolean;
  comment_count: number;
}

const FroalaEditor = dynamic(() => import("@/containers/post/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface CreateFeedProps {
  feed?: Feed;
  onSubmit: (data: PostData) => void;
  type: "create" | "modify";
}

const PostFeed = ({ feed, onSubmit, type }: CreateFeedProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<PostData>({
    mode: "onChange",
    defaultValues: {
      title: feed?.title || "",
      content: feed?.content || "",
      is_private: false,
      comment_count: 0,
    },
  });

  return (
    <Flex
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      direction={"column"}
      gap={2}
    >
      <Heading size={"md"} pl={2} pb={2}>
        피드를 {type === "create" ? "작성" : "수정"}해보세요!
      </Heading>
      <Input
        type="text"
        placeholder={"제목을 입력하세요"}
        {...register("title")}
        border={"1px solid #CCCCCC"}
        _placeholder={{
          fontStyle: "italic",
          fontSize: "14px",
        }}
      />
      <Controller
        name="content"
        control={control}
        defaultValue=""
        render={() => (
          <FroalaEditor
            value={getValues("content") || ""}
            onChange={(value) => setValue("content", value)}
          />
        )}
      />
      <Flex justify={"end"}>
        <Button type="submit" variant={"outline"}>
          {type === "create" ? "등록" : "수정"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default PostFeed;
