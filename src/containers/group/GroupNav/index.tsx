import { groupNavItems } from "@/constants";
import { Box, Button, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { pageRouter } from "./pageRouter";
import { useRouter } from "next/router";

interface GroupNavProps {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  groupId: number;
}

const GroupNav = ({ setSelected, selected, groupId }: GroupNavProps) => {
  const router = useRouter();
  return (
    <Flex>
      <Box borderBottomWidth={1} w={8} position={"relative"} top={"1px"} />
      <Tabs variant={"enclosed"} flex={1} size={"md"} position={"relative"}>
        <Button
          position={"absolute"}
          right={0}
          display={selected === "Feed" ? "block" : "none"}
        >
          작성하기
        </Button>
        <TabList>
          {groupNavItems.map((v, i) => {
            return (
              <Tab
                key={`groupnav_${i}`}
                fontWeight={"bold"}
                fontSize={"lg"}
                onClick={() => pageRouter(v, groupId, router)}
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
