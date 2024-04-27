import { Swiper } from "@/components";
import { GroupCard, HotGroupImage } from "@/containers";
import { useBgColor } from "@/hooks";
import { Group, ImgWithType } from "@/types";
import { Flex } from "@chakra-ui/react";

interface HotGroupItemProps {
  data: Group;
}

const HotGroupItem = ({ data }: HotGroupItemProps) => {
  const bgColor = useBgColor();

  return (
    <Flex
      direction={"column"}
      minH={100}
      style={{
        background: "linear-gradient(to right, #2C5282, #4299E1,#00B5D8)",
      }}
      p={1}
    >
      <Flex
        bgColor={bgColor}
        p={1}
        flex={1}
        direction={"column"}
        overflow={"hidden"}
      >
        <Swiper<ImgWithType> datas={data.images} renderItem={HotGroupImage} />
      </Flex>
      <GroupCard data={data} />
    </Flex>
  );
};

export default HotGroupItem;
