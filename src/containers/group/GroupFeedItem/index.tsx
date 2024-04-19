import { useGetMe } from "@/apis";
import { CircleImg } from "@/components";
import { PageRoutes } from "@/constants";
import { useBgColor } from "@/hooks";
import { Feed } from "@/types";
import { toUrl } from "@/utils";
import { formatISO } from "@/utils/date";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { CommentForm } from "./CommentForm";
import { FeedModifyIcon } from "./FeedModifyIcon";
import { LikeCommentCounter } from "./LikeCommentCounter";

interface GroupFeedItemProps {
  data: Feed;
}

export interface PostComment {
  content: string;
}

export const dummyUserData = {
  id: 1,
  name: "yoonHwi",
  imgSrc: "/noneUserImg.webp",
};

const maxBodyHeight = 200;

const GroupFeedItem = ({ data }: GroupFeedItemProps) => {
  const [moreContent, setMoreContent] = useState(false);

  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const { data: me } = useGetMe();

  const bgColor = useBgColor();

  const routerPushHandler = useCallback(() => {
    router.push(toUrl(PageRoutes.Feed, { id: data.id }));
  }, [data.id, router]);

  useEffect(() => {
    if (bodyRef.current) {
      const contentHeight = bodyRef.current.offsetHeight;
      if (contentHeight > maxBodyHeight) {
        setMoreContent(true);
        bodyRef.current.style.overflow = "hidden";
        bodyRef.current.style.maxHeight = `${maxBodyHeight}px`;
      }
    }
  }, [bodyRef, data.content]);

  return (
    <Card direction={"column"} backgroundColor={bgColor} p={"4"}>
      <Flex gap={4} position={"relative"}>
        {me?.id === data.user_id && <FeedModifyIcon feed={data} />}
        <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={10} />
        <Flex direction={"column"}>
          <Heading size={"sm"}>{data.user?.name}</Heading>
          <Text color={"subtleText"}>{formatISO(data.created_at)}</Text>
        </Flex>
      </Flex>
      <Flex py={"6"} px={"2"} direction={"column"}>
        <Flex ref={bodyRef} direction={"column"} gap={"2"}>
          <Heading size={"sm"}>{data.title}</Heading>
          <Text id="text">{data.content}</Text>
        </Flex>
      </Flex>
      <Box position={"relative"}>
        {moreContent && (
          <Box position={"absolute"} top={-10} opacity={0.8} right={"50%"}>
            <Button p={2} onClick={() => routerPushHandler()}>
              더보기
            </Button>
          </Box>
        )}
      </Box>
      <Flex direction={"column"} gap={"4"}>
        <LikeCommentCounter
          commentCount={data.comment_count}
          likeCount={0}
          handleCommentClick={routerPushHandler}
        />
        <CommentForm type="group" feedId={data.id} />
      </Flex>
    </Card>
  );
};

export default GroupFeedItem;
