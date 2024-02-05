import { Flex, Button, Input, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";

interface PostData {
  title: string;
  content: string;
}

const FroalaEditor = dynamic(() => import("@/containers/post/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface CreateFeedProps {
  post?: {
    title: string;
    content: string;
  };
}

const CreateFeed = ({ post }: CreateFeedProps) => {
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
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const onSubmit = (values: PostData) => {
    console.log(values);
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
