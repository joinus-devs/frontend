import { useFetch, useUpdate } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { User, Comment as _Comment } from "@/types";
import { formatISO } from "@/utils/date";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PostComment } from "../../GroupFeedItem";
import { CommentModifyIcon } from "./CommentModifyIcon";
import { toUrl } from "@/utils";

interface CommentProps {
  comment: _Comment;
}

export const Comment = ({ comment }: CommentProps) => {
  const [isModify, setIsModify] = useState(false);
  const { register, handleSubmit } = useForm<PostComment>({
    defaultValues: { content: comment.content },
  });

  const { mutate: modifyComment } = useUpdate(
    toUrl(ApiRoutes.Comments, { id: comment.id })
  );

  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const isMine = useMemo(() => me?.id === comment.user_id, [me, comment]);

  const handleSubmitComment = useCallback(
    (data: PostComment) => {
      modifyComment(data, {
        onSuccess: () => {
          setIsModify(false);
        },
      });
    },
    [modifyComment]
  );

  return (
    <Flex gap={4} position={"relative"} overflow={"hidden"}>
      {isMine && !isModify && (
        <CommentModifyIcon
          comment={comment}
          onClick={() => setIsModify(true)}
        />
      )}
      <CircleImg imgSrc={"/noneUserImg.webp"} alt={`comment_user`} size={12} />
      <Flex direction={"column"} gap={1} w={"100%"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"}>{comment.user?.name}</Text>
          <Text opacity={0.7}>{formatISO(comment.created_at)}</Text>
        </Flex>
        {isModify ? (
          <Textarea
            w={"100%"}
            defaultValue={comment.content}
            {...register("content")}
          />
        ) : (
          <Text>{comment.content}</Text>
        )}
        {isModify && (
          <Flex
            gap={2}
            justify={"end"}
            onSubmit={handleSubmit(handleSubmitComment)}
            as={"form"}
          >
            <Button onClick={() => setIsModify(false)}>취소</Button>
            <Button type="submit">수정완료</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
