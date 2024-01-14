import { GroupDetailProps } from "@/pages/group/[id]";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import GroupNav from "../GroupNav";
import { DynamicRender } from "./DynamicRender";
import { useState } from "react";
import GroupDescription from "../GroupDescription";

const GroupInfo = ({ group }: GroupDetailProps) => {
  const [navItem, setNavItem] = useState<string>("Home");

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      minH={1400}
      mt={8}
      pb={8}
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
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <GroupDescription />
      <GroupNav selected={navItem} setSelected={setNavItem} />
      <Box flex={2} mt={8}>
        <DynamicRender selected={navItem} />
      </Box>
    </Flex>
  );
};

export default GroupInfo;
