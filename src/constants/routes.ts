import { GrGroup } from "react-icons/gr";
import { MdOutlineMarkChatUnread } from "react-icons/md";

export enum ApiRoutes {
  Home = "",
  Group = "clubs/:id?",
  NewFeed = "new-feed",
  Support = "support",
  Feeds = "feeds/:id?",
  Comments = "comments/:id?",
  Image = "storage/image",
  Me = "auth/me",
  SignIn = "auth/signin",
  SignInSocial = "auth/signin/social",
  SignUp = "auth/signup",
  SignUpSocial = "auth/signup/social",
  SignOut = "/auth/signout",
  UpdateUser = "users/:id?",
  CheckEmailExists = "auth/check-email",
  Category = "categories",
  Chat = "clubs/:id?/chats",
  GroupMembers = "clubs/:id/users/:userId?",
  GroupFeed = "clubs/:id?/feeds",
  GroupList = "clubs",
  FeedInComments = "feeds/:id?/comments",
}

export enum PageRoutes {
  Home = "/",
  Group = "/group/:id?",
  SignIn = "/auth/signin",
  SignUp = "/auth/register",
  CreateGroup = "/group/create",
  Feed = "/feed/:id?",
  NewFeed = "/new-feed",
  AuthMypage = "/auth/mypage",
  GroupHome = "/group/:id/home",
  GroupMember = "/group/:id/member",
  GroupFeed = "/group/:id/feed",
  GroupNotice = "/group/:id/notice",
  GroupCreateFeed = "/group/:id/feed/create",
  GroupModifyFeed = "/group/:id/feed/:feedId/modify",
  GroupPermissionMember = "/group/:id/member/permission",
  GroupSetting = "/group/:id/setting",
}

export const navs = [
  {
    label: "그룹",
    pathname: PageRoutes.Group,
    icon: GrGroup,
  },
  {
    label: "피드",
    pathname: PageRoutes.NewFeed,
    icon: MdOutlineMarkChatUnread,
  },
];
