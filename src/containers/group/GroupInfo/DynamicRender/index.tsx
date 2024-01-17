import { GroupProps } from "@/pages/group/[id]";
import { GroupFeed, GroupMember, GroupChat, GroupNotice } from "../..";

interface DynamicRenderProps {
  selected: string;
  group: GroupProps;
}

export const DynamicRender = ({ selected, group }: DynamicRenderProps) => {
  switch (selected) {
    case "Home":
      return <GroupFeed />;
    case "Member":
      return <GroupMember />;
    case "Messenger":
      return <GroupChat group={group} />;
    case "Notice":
      return <GroupNotice />;
  }
};
