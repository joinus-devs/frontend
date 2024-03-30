import { User } from "@/types";

interface FormatMemberValue {
  name: string;
  profile: string;
}

export const formatGroupMembers = (
  members: User[]
): { [key: number]: FormatMemberValue } => {
  let formatData: { [key: number]: FormatMemberValue } = {};
  for (let member of members) {
    const { id, name, profile } = member;

    formatData[id] = {
      name,
      profile,
    };
  }
  return formatData;
};
