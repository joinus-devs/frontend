import { usePost } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

interface PostComment {
  content: string;
}

interface PostCommentProps {
  type: "group" | "feed";
  feedId: number;
  groupId?: number;
}

const initialFormValues: PostComment = {
  content: "",
};

export const PostComment = ({ type, feedId, groupId }: PostCommentProps) => {
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
          if (type === "group") {
            queryClient.invalidateQueries({
              queryKey: [toUrl(ApiRoutes.GroupFeed, { id: groupId })],
            });
          }
          if (type === "feed") {
            queryClient.invalidateQueries({
              queryKey: [toUrl(ApiRoutes.Feeds, { id: feedId })],
            });
          }
          reset(initialFormValues);
        },
      });
    },
    [feedId, groupId, postComment, queryClient, reset, type]
  );

  return (
    <Flex p={4} gap={2} alignItems={"center"}>
      <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={14} />
      <Flex
        as={"form"}
        position={"relative"}
        w={"100%"}
        onSubmit={handleSubmit(handleSubmitComment)}
      >
        <Input
          placeholder={"댓글을 입력하세요"}
          size="lg"
          h={16}
          ml={4}
          {...register("content")}
        />
        <Button
          type="submit"
          position={"absolute"}
          fontWeight={"bold"}
          m={2}
          w={12}
          h={12}
          zIndex={1}
          right={0}
        >
          <Icon as={FaCheck} />
        </Button>
      </Flex>
    </Flex>
  );
};
