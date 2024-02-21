import { CircleImg } from "@/components";
import { useBgColor } from "@/hooks";
import { Feed } from "@/types";
import { Box, Flex, Heading, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GroupFeedItem } from "..";

const dummyGroupData = {
  name: "dummy",
};

interface NewFeedItemProps {
  data: Feed;
}
const NewFeedItem = ({ data }: NewFeedItemProps) => {
  const router = useRouter();
  const bgColor = useBgColor();

  return (
    <Flex gap={4} boxShadow={"lg"} p={4} borderRadius={12}>
      <Flex
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={4}
        as={"button"}
        onClick={() => router.push(`/group/${data.club_id}`)}
        position={"relative"}
        boxShadow={"md"}
        borderRadius={12}
        backgroundColor={bgColor}
      >
        <Tag position={"absolute"} right={8} top={8} p={2} h={8} fontSize={16}>
          category
          {/* {dummyGroupData.category[0]} */}
        </Tag>
        <CircleImg imgSrc={"/none-groupimg.webp"} alt="group_img" size={48} />
        <Heading size={"md"}>{dummyGroupData.name}</Heading>
      </Flex>
      {/* <Box flex={2}>
        <GroupFeedItem data={data} />
      </Box> */}
    </Flex>
  );
};
export default NewFeedItem;
