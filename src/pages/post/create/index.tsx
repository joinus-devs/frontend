import { DefaultLayout } from "@/components";
import QuillEditor from "@/containers/post/Quill";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";

export interface PostData {
  title: string;
  content: string;
}

const CreatePost = () => {
  const ref = useRef<ReactQuill>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostData>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: PostData) => {
    values.content = (ref.current?.value as string) || "";
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>Join Us - CreatePost</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="space-between" mb={4}>
            <Text as="b" fontSize="2xl" mt={5}>
              게시글 작성
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
          <QuillEditor forwardedRef={ref} defaultValue={""} />
        </form>
      </DefaultLayout>
    </>
  );
};

export default CreatePost;
