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
  const { mutate: deleteComment } = useDelete(toUrl(ApiRoutes.Comments));

  return (
    <Popover trigger={"click"} placement="left">
      <PopoverTrigger>
        <Box as="button" top={4} right={4} position={"absolute"}>
          <Icon as={BsThreeDotsVertical} fontSize={20} />
        </Box>
      </PopoverTrigger>
      <PopoverContent width={20} alignItems={"center"} mt={12}>
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
                    console.log("delete comment success");
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
