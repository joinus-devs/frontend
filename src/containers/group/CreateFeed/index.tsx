import { usePost } from "@/apis";
import { usePostFeed } from "@/apis/feed";
import { ApiRoutes, PageRoutes } from "@/constants";
import { Feed } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

interface PostData {
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
}

const CreateFeed = ({ feed }: CreateFeedProps) => {
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
  const router = useRouter();
  const clubId = QueryParser.toNumber(router.query.id);
  const { mutate } = usePostFeed(clubId);

  const onSubmit = (values: PostData) => {
    mutate(values, {
      onSuccess: () => {
        router.push(
          toUrl(PageRoutes.GroupFeed, {
            id: clubId,
          })
        );
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" mb={4}>
        <Text as="b" fontSize="2xl" mt={5}>
          피드 작성
        </Text>
        <Button
          mt={4}
          color="green.400"
          type="submit"
          backgroundColor="blue.50"
          _hover={{ bg: "ghost" }}
          _active={{ bg: "ghost" }}
        >
          등록
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

export default CreateFeed;
