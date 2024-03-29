export enum ApiRoutes {
  Home = "",
  Group = "clubs/:id?",
  NewFeed = "new-feed",
  Support = "support",
  SignIn = "auth/signin",
  SignInSocial = "auth/signin/social",
  SignUp = "auth/signup",
  SignUpSocial = "auth/signup/social",
  SignOut = "auth/signout",
  CheckEmailExists = "auth/check-email",
  Me = "auth/me",
  Category = "categories",
  GroupMembers = "clubs/:id/users/:userId?",
  GroupFeed = "clubs/:id?/feeds",
  Feeds = "feeds/:id?",
  FeedInComments = "feeds/:id?/comments",
  Comments = "comments/:id?",
  Image = "storage/image",
}

export enum PageRoutes {
  Home = "/",
  Group = "/group/:id?",
  CreateGroup = "/group/create",
  Feed = "/feed/:id?",
  NewFeed = "/new-feed",
  Support = "/support",
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
    label: "Home",
    pathname: PageRoutes.Home,
  },
  {
    label: "Group",
    pathname: PageRoutes.Group,
  },
  {
    label: "New Feed",
    pathname: PageRoutes.NewFeed,
  },
  {
    label: "Support",
    pathname: PageRoutes.Support,
  },
];

export const supportNavs = [
  {
    label: "공지사항",
  },
  {
    label: "이용약관",
  },
  {
    label: "문의하기",
  },
  {
    label: "자주 묻는 질문",
  },
];
