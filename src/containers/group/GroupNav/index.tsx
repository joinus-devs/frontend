import { groupNavItems } from "@/constants";
import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useCallback } from "react";

interface GroupNavProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
const GroupNav = ({ selected, setSelected }: GroupNavProps) => {
  const handleClickNavItem = useCallback(
    (v: string) => {
      setSelected(v);
    },
    [setSelected]
  );
  return (
    <Flex>
      <Box borderBottomWidth={1} w={4} />
      <Tabs variant={"enclosed"} flex={1}>
        <TabList>
          {groupNavItems.map((v, i) => {
            return (
              <Tab
                key={`group_nav_${i}`}
                fontWeight={"bold"}
                fontSize={"lg"}
                onClick={() => handleClickNavItem(v)}
                as={"button"}
                mb={"-1px"}
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
