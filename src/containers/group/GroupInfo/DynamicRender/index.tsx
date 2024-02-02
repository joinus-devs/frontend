import { Group } from "@/types";
import { GroupChat, GroupFeed, GroupMember, GroupNotice } from "../..";

interface DynamicRenderProps {
  selected: string;
  group: Group;
}

export const DynamicRender = ({ selected, group }: DynamicRenderProps) => {
  switch (selected) {
    case "Home":
      return <GroupChat group={group} />;
    case "Member":
      return <GroupMember />;
    case "Feed":
      return <GroupFeed />;
    case "Notice":
      return <GroupNotice />;
  }
};
