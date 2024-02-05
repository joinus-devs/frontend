import { useDelete, usePost } from "@/apis";
import { ApiRoutes } from "@/constants";
import { CreateFeed } from "@/containers";
import { useModalStore } from "@/stores";
import { Feed } from "@/types";
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
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ModifyIconProps {
  feed: Feed;
  groupId?: number;
  setOnCreateFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModifyIcon = ({
  feed,
  groupId,
  setOnCreateFeed,
}: ModifyIconProps) => {
  const queryClient = useQueryClient();
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { mutate: deleteFeed } = useDelete(ApiRoutes.Feeds);
  const post = { title: feed.title, content: feed.content };
  return (
    <>
      <Popover trigger={"click"} placement="left">
        <PopoverTrigger>
          <Box as="button" top={4} right={4} position={"absolute"}>
            <Icon as={BsThreeDotsVertical} fontSize={20} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width={20} alignItems={"center"} mt={12}>
          <Text padding={2} as={"button"} onClick={() => setOnCreateFeed(true)}>
            수정
          </Text>
          <Text
            padding={2}
            as={"button"}
            onClick={() =>
              openConfirm({
                title: "Delete Post",
                content: "해당피드를 삭제하시겠습니까?",
                onConfirm: () =>
                  deleteFeed(feed.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: [toUrl(ApiRoutes.GroupFeed, { id: groupId })],
                      });
                    },
                  }),
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
