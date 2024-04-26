import { usePost } from "@/apis";
import { ApiRoutes, PageRoutes } from "@/constants";
import { PostComment } from "@/types";

import { toUrl } from "@/utils";
import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

interface FeedCommentFormProps {
  feedId: number;
}

const initialFormValues: PostComment = {
  content: "",
};

const FeedCommentForm = ({ feedId }: FeedCommentFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: postComment } = usePost(
    toUrl(ApiRoutes.FeedInComments, { id: feedId })
  );

  const { register, handleSubmit, reset } = useForm<PostComment>({
    defaultValues: initialFormValues,
  });

  const handleSubmitComment = useCallback(
    (data: PostComment) => {
      postComment(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.Feeds, { id: feedId })],
          });

          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.FeedInComments, { id: feedId })],
          });
          reset(initialFormValues);

          const path = toUrl(PageRoutes.Feed, { id: feedId });

          router.asPath !== path && router.push(path);
        },
      });
    },
    [feedId, postComment, queryClient, reset, router]
  );

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        as={"form"}
        position={"relative"}
        w={"100%"}
        onSubmit={handleSubmit(handleSubmitComment)}
      >
        <Input placeholder={"댓글을 입력하세요"} {...register("content")} />
        <IconButton
          type="submit"
          position={"absolute"}
          aria-label="submit comment"
          fontWeight={"bold"}
          zIndex={1}
          size={"sm"}
          top={"1"}
          right={"1"}
        >
          <Icon as={FaCheck} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default FeedCommentForm;
