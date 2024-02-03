import { groupNavItems } from "@/constants";
import { Box, Button, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";

interface GroupNavProps {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setOnCreateFeed: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  onCreateFeed: boolean;
}

const GroupNav = ({
  setSelected,
  selected,
  setOnCreateFeed,
  onCreateFeed,
}: GroupNavProps) => {
  return (
    <Flex>
      <Box borderBottomWidth={1} w={8} position={"relative"} top={"1px"} />
      <Tabs variant={"enclosed"} flex={1} size={"md"} position={"relative"}>
        <Button
          position={"absolute"}
          right={0}
          display={selected === "Feed" ? "block" : "none"}
          onClick={() => setOnCreateFeed(!onCreateFeed)}
        >
          {onCreateFeed ? "돌아가기" : "작성하기"}
        </Button>
        <TabList>
          {groupNavItems.map((v, i) => {
            return (
              <Tab
                key={`groupnav_${i}`}
                fontWeight={"bold"}
                fontSize={"lg"}
                onClick={() => setSelected(v)}
                as={"button"}
              >
                {v}
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default GroupNav;
