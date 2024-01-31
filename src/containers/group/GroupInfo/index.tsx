import { Group } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GroupDescription from "../GroupDescription";
import GroupNav from "../GroupNav";
import { DynamicRender } from "./DynamicRender";

interface GroupInfoProps {
  group: Group;
}

const GroupInfo = ({ group }: GroupInfoProps) => {
  const [navItem, setNavItem] = useState<string>("Home");

  return (
    <Flex direction={"column"} w={"100%"} minH={1400}>
      <Box
        w={"100%"}
        h={300}
        overflow={"hidden"}
        position={"relative"}
        shadow={"lg"}
      >
        <Image
          src={"/none-groupimg.webp"}
          alt="groupImg"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <GroupDescription group={group} />
      <GroupNav setSelected={setNavItem} />
      <Box
        flex={2}
        overflow={"hidden"}
        borderRightWidth={"1px"}
        borderLeftWidth={"1px"}
      >
        <Box mt={8} mb={8} ml={2} mr={2}>
          <DynamicRender selected={navItem} group={group} />
        </Box>
      </Box>
    </Flex>
  );
};

export default GroupInfo;
