import { User } from "@/types";

export interface FormatMemberValue {
  [key: number]: {
    name: string;
    profile: string;
  };
}

export const formatGroupMembers = (members: User[]): FormatMemberValue => {
  let formatData: FormatMemberValue = {};
  for (let member of members) {
    const { id, name, profile } = member;

    formatData[id] = {
      name,
      profile,
    };
  }
  return formatData;
};
