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
}

export enum PageRoutes {
  Home = "/",
  Group = "/group/:id?",
  CreateGroup = "/group/create",
  NewFeed = "/new-feed",
  Support = "/support",
  SignIn = "/auth/signin",
  SignUp = "/auth/signup",
  SignOut = "/auth/signout",
  Me = "/auth/me",
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
