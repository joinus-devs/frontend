import { CircleImg } from "@/components";
import { useBgColor } from "@/hooks";
import { Feed } from "@/types";
import { Box, Flex, Heading, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GroupFeedItem } from "..";
import { useMemo } from "react";
import { PageRoutes, toCategory } from "@/constants";
import { toUrl } from "@/utils";

interface NewFeedItemProps {
  data: Feed;
}

const NewFeedItem = ({ data }: NewFeedItemProps) => {
  const router = useRouter();
  const bgColor = useBgColor();

  const mainGroupImg = useMemo(() => {
    const none = "/none-groupimg.webp";
    if (!data.club || !data.club.images) return none;
    if (data.club.images.length === 0) return none;
    const main = data.club.images.find((image) => image.type === "main");
    if (!main) return none;
    return main.url;
  }, [data.club]);

  return (
    <Flex gap={4} boxShadow={"lg"} p={4} borderRadius={12}>
      <Flex
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        as={"button"}
        onClick={() =>
          router.push(toUrl(PageRoutes.GroupHome, { id: data.club_id }))
        }
        position={"relative"}
        boxShadow={"md"}
        borderRadius={12}
        backgroundColor={bgColor}
      >
        <Flex gap={2} wrap={"wrap"} p={2}>
          {data.club?.categories.map((category) => {
            return (
              <Tag key={`category_${category}`}>{toCategory[category]}</Tag>
            );
          })}
        </Flex>
        <CircleImg imgSrc={mainGroupImg} alt="group_img" size={36} />
        <Heading size={"md"}>{data.club?.name}</Heading>
      </Flex>
      <Box flex={2}>
        <GroupFeedItem data={data} />
      </Box>
    </Flex>
  );
};
export default NewFeedItem;
