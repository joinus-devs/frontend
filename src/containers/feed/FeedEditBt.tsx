import { useDelete } from "@/apis";
import { ApiRoutes, PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { Feed } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import {
  Box,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";

interface FeedEditBtProps {
  feed: Feed;
}

const FeedEditBt = ({ feed }: FeedEditBtProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openConfirm } = useModalStore(["openConfirm"]);
  const { mutate: deleteFeed } = useDelete(ApiRoutes.Feeds);

  return (
    <>
      <Popover trigger={"click"} placement="left">
        <PopoverTrigger>
          <Box as="button" top={4} right={4} position={"absolute"}>
            <Icon as={BsThreeDotsVertical} fontSize={20} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width={20} alignItems={"center"} mt={12}>
          <Text
            padding={2}
            as={"button"}
            onClick={() =>
              router.push(
                toUrl(PageRoutes.GroupModifyFeed, {
                  id: feed.club_id,
                  feedId: feed.id,
                })
              )
            }
          >
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
                        queryKey: [
                          toUrl(ApiRoutes.GroupFeed, { id: feed.club_id }),
                        ],
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

export default FeedEditBt;
