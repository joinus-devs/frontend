import { ImageViewer } from "@/components";
import { GroupCard } from "@/containers";
import { Group } from "@/types";
import { Flex } from "@chakra-ui/react";

interface HotGroupItemProps {
  data: Group;
}

const HotGroupItem = ({ data }: HotGroupItemProps) => {
  return (
    <Flex
      direction={"column"}
      minH={100}
      style={{
        background: "linear-gradient(to right, #2C5282, #4299E1,#00B5D8)",
      }}
      p={1}
    >
      <ImageViewer data={data} />
      <GroupCard data={data} />
    </Flex>
  );
};

export default HotGroupItem;
