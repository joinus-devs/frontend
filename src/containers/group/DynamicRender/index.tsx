import { Group } from "@/types";
import { Box } from "@chakra-ui/react";
import { GroupChat, GroupFeed, GroupMember, GroupNotice } from "..";

interface DynamicRenderProps {
  selected: string;
  group: Group;
  onCreateFeed: boolean;
  setOnCreateFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DynamicRender = ({
  selected,
  group,
  onCreateFeed,
  setOnCreateFeed,
}: DynamicRenderProps) => {
  const render = () => {
    switch (selected) {
      case "Home":
        return <GroupChat group={group} />;
      case "Member":
        return <GroupMember group={group} />;
      case "Feed":
        return (
          <GroupFeed
            onCreateFeed={onCreateFeed}
            group={group}
            setOnCreateFeed={setOnCreateFeed}
          />
        );
      case "Notice":
        return <GroupNotice />;
    }
  };

  return (
    <Box
      flex={2}
      overflow={"hidden"}
      borderRightWidth={"1px"}
      borderLeftWidth={"1px"}
    >
      <Box mt={8} mb={8} ml={2} mr={2}>
        {render()}
      </Box>
    </Box>
  );
};
