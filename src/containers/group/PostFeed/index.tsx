import { Feed } from "@/types";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" mb={4}>
        <Text as="b" fontSize="2xl" mt={5}>
          {type === "create" ? "피드 작성" : "피드 수정"}
        </Text>
        <Button
          mt={4}
          color="green.400"
          type="submit"
          backgroundColor="blue.50"
          _hover={{ bg: "ghost" }}
          _active={{ bg: "ghost" }}
        >
          {type === "create" ? "등록" : "수정"}
        </Button>
      </Flex>
      <hr />
      <Input
        type="text"
        placeholder="제목을 입력하세요."
        {...register("title", { required: "제목을 입력하세요" })}
        borderColor="white"
        focusBorderColor="gray.300"
        mt={4}
        mb={4}
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
    </form>
  );
};

export default PostFeed;
