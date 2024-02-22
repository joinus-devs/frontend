import { useFetch, useUpdate } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { User, Comment } from "@/types";
import { formatISO } from "@/utils/date";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PostComment } from "../../GroupFeedItem";
import { CommentModifyIcon } from "./CommentModifyIcon";
import { toUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";

interface CommentProps {
  data: Comment;
}

const FeedComment = ({ data }: CommentProps) => {
  const [isModify, setIsModify] = useState(false);
  const [height, setHeight] = useState(0);
  const queryClient = useQueryClient();
  const textRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit } = useForm<PostComment>({
    defaultValues: { content: data.content },
  });

  const { mutate: modifyComment } = useUpdate(
    toUrl(ApiRoutes.Comments, { id: data.id })
  );

  const { data: me } = useFetch<User>(ApiRoutes.Me);

  const isMine = useMemo(() => me?.id === data.user_id, [me?.id, data.user_id]);

  const handleSubmitComment = useCallback(
    (inputData: PostComment) => {
      modifyComment(inputData, {
        onSuccess: () => {
          setIsModify(false);
          //수정시 feed의 comment를 다시 불러오기 위한 쿼리 invalidation
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.FeedInComments, { id: data.feed_id })],
          });
        },
      });
    },
    [data.feed_id, modifyComment, queryClient]
  );

  useEffect(() => {
    if (!textRef.current) return;
    setHeight(textRef.current.clientHeight);
  }, []);

  return (
    <Flex
      gap={4}
      position={"relative"}
      boxShadow={"sm"}
      p={8}
      borderRadius={12}
    >
      {isMine && !isModify && (
        <CommentModifyIcon comment={data} onClick={() => setIsModify(true)} />
      )}
      <CircleImg imgSrc={"/noneUserImg.webp"} alt={`comment_user`} size={12} />
      <Flex direction={"column"} gap={1} w={"80%"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"}>{data.user?.name}</Text>
          <Text opacity={0.7}>{formatISO(data.created_at)}</Text>
        </Flex>
        {isModify ? (
          <Textarea
            w={"100%"}
            defaultValue={data.content}
            {...register("content")}
            minH={height}
          />
        ) : (
          <Text ref={textRef}>{data.content} </Text>
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

export default FeedComment;
