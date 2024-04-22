import { Feed } from "@/types";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FeedEditBt } from ".";
import { CircleImg } from "@/components";
import { formatISO } from "@/utils";
import { useGetMe } from "@/apis";
import { useEffect, useRef } from "react";

interface FeedBodyProps {
  feed: Feed;
}

//Feed의 작성자,작성일자,제목,본문내용을 보여주는 컴포넌트

const FeedBody = ({ feed }: FeedBodyProps) => {
  const { data: me } = useGetMe();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.innerHTML = feed.content;
  }, [feed.content]);

  return (
    <Box>
      <Flex gap={4} position={"relative"}>
        {me?.id === feed.user_id && <FeedEditBt feed={feed} />}
        <CircleImg imgSrc={feed.user.profile} alt="userImg" size={10} />
        <Flex direction={"column"}>
          <Heading size={"sm"}>{feed.user?.name}</Heading>
          <Text color={"subtleText"}>{formatISO(feed.created_at)}</Text>
        </Flex>
      </Flex>
      <Flex py={"6"} px={"2"} direction={"column"}>
        <Flex direction={"column"} gap={"2"}>
          <Heading size={"sm"}>{feed.title}</Heading>
          <Box ref={textRef} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeedBody;
