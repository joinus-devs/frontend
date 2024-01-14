import { GroupFeed, GroupMember, GroupChat, GroupNotice } from "../..";

interface DynamicRenderProps {
  selected: string;
}

export const DynamicRender = ({ selected }: DynamicRenderProps) => {
  switch (selected) {
    case "Home":
      return <GroupFeed />;
    case "Member":
      return <GroupMember />;
    case "Messenger":
      return <GroupChat />;
    case "Notice":
      return <GroupNotice />;
  }
};
