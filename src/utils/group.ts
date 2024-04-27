import { User } from "@/types";

export interface FormatMemberValue {
  [key: number]: {
    name: string;
    profile: string;
  };
}

export const formatGroupMembers = (members: User[]): FormatMemberValue => {
  const formatData: FormatMemberValue = {};
  for (const member of members) {
    const { id, name, profile } = member;

    formatData[id] = {
      name,
      profile,
    };
  }
  return formatData;
};
