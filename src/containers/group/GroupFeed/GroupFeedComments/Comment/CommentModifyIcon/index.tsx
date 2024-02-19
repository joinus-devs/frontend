import { useModalStore } from "@/stores";
import {
  Box,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Comment } from "@/types";
import { useDelete } from "@/apis";
import { toUrl } from "@/utils";
import { ApiRoutes } from "@/constants";

interface CommentModifyIconProps {
  comment: Comment;
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentModifyIcon = ({ comment, set }: CommentModifyIconProps) => {
  console.log(comment);
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { mutate: deleteComment } = useDelete(
    toUrl(ApiRoutes.Comments, { id: comment.id })
  );

  return (
    <>
      <Popover trigger={"click"} placement="left">
        <PopoverTrigger>
          <Box as="button" top={4} right={4} position={"absolute"}>
            <Icon as={BsThreeDotsVertical} fontSize={20} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width={20} alignItems={"center"} mt={12}>
          <Text padding={2} as={"button"} onClick={() => set(true)}>
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
                  console.log(comment.id);
                  deleteComment(undefined, {
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
    </>
  );
};
