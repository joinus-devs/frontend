import { groupNavItems } from "@/constants";
import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";

interface GroupNavProps {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
const GroupNav = ({ setSelected }: GroupNavProps) => {
  return (
    <Flex>
      <Box borderBottomWidth={1} w={4} position={"relative"} top={"1px"} />
      <Tabs variant={"enclosed"} flex={1} size={"md"}>
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
