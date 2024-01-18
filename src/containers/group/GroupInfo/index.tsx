import { GroupProps } from "@/pages/group/[id]";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import GroupNav from "../GroupNav";
import { DynamicRender } from "./DynamicRender";
import { useState } from "react";
import GroupDescription from "../GroupDescription";

interface GroupInfoProps {
  group: GroupProps;
}
const GroupInfo = ({ group }: GroupInfoProps) => {
  const [navItem, setNavItem] = useState<string>("Home");

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      minH={1400}
      borderTopRightRadius={"lg"}
      borderTopLeftRadius={"lg"}
      overflow={"hidden"}
      borderRightWidth={"1px"}
      borderLeftWidth={"1px"}
    >
      <Box
        w={"100%"}
        h={300}
        overflow={"hidden"}
        position={"relative"}
        shadow={"lg"}
      >
        <Image
          src={group.imgSrc}
          alt="groupImg"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <GroupDescription />
      <GroupNav setSelected={setNavItem} />
      <Box flex={2} mt={8}>
        <DynamicRender selected={navItem} group={group} />
      </Box>
    </Flex>
  );
};

export default GroupInfo;
