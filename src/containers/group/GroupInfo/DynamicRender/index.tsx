import { GroupProps } from "@/pages/group/[id]";
import { GroupFeed, GroupMember, GroupChat, GroupNotice } from "../..";

interface DynamicRenderProps {
  selected: string;
  group: GroupProps;
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
