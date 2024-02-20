import { useDelete } from "@/apis";
import { ApiRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { Comment } from "@/types";
import { toUrl } from "@/utils";
import {
  Box,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CommentModifyIconProps {
  comment: Comment;
  onClick?: () => void;
}

export const CommentModifyIcon = ({
  comment,
  onClick,
}: CommentModifyIconProps) => {
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { mutate: deleteComment } = useDelete(ApiRoutes.Comments);
  const queryClient = useQueryClient();
  return (
    <Popover trigger={"click"} placement="left">
      <PopoverTrigger>
        <Box as="button" top={4} right={4} position={"absolute"}>
          <Icon as={BsThreeDotsVertical} fontSize={20} />
        </Box>
      </PopoverTrigger>
      <PopoverContent width={20} alignItems={"center"}>
        <Text padding={2} as={"button"} onClick={onClick}>
          수정
        </Text>
        <Text
          padding={2}
          as={"button"}
          onClick={() =>
            openConfirm({
              title: "Delete Comment",
              content: "해당댓글을 삭제하시겠습니까?",
              onConfirm: () => {
                deleteComment(comment.id, {
                  onSuccess: () => {
                    //삭제시 feed의 comment를 다시 불러오기 위한 쿼리 invalidation
                    queryClient.invalidateQueries({
                      queryKey: [
                        toUrl(ApiRoutes.FeedInComments, {
                          id: comment.feed_id,
                        }),
                      ],
                    });
                    //삭제시 feed의 감소된 comment_count 출력을 위한 쿼리 invalidation
                    queryClient.invalidateQueries({
                      queryKey: [
                        toUrl(ApiRoutes.Feeds, {
                          id: comment.feed_id,
                        }),
                      ],
                    });
                  },
                });
              },
            })
          }
        >
          삭제
        </Text>
      </PopoverContent>
    </Popover>
  );
};
