import { PageRoutes } from "./routes";

export const groupCategory = [
  "스포츠",
  "음악",
  "게임",
  "영화",
  "책",
  "요리",
  "IT",
  "기타",
];

export const groupMaxParticipants = [10, 20, 30, 40, 50];
export const groupAcceptSex = ["남성", "여성"];

export const groupNavs = [
  { label: "Home", path: PageRoutes.GroupHome, subPaths: [] },
  {
    label: "Member",
    path: PageRoutes.GroupMember,
    subPaths: [PageRoutes.GroupPermissionMember],
  },
  {
    label: "Feed",
    path: PageRoutes.GroupFeed,
    subPaths: [PageRoutes.GroupCreateFeed, PageRoutes.GroupModifyFeed],
  },
  { label: "Notice", path: PageRoutes.GroupNotice, subPaths: [] },
];
