export const ApiRoutes = {
  Home: "/",
  Group: "/group",
  CreateGroup: "/group/create",
  NewFeed: "/newfeed",
  Support: "/support",
  SignIn: "/auth/signin",
};

export const navs = [
  {
    label: "Home",
    pathname: ApiRoutes.Home,
  },
  {
    label: "Group",
    pathname: ApiRoutes.Group,
  },
  {
    label: "New Feed",
    pathname: ApiRoutes.NewFeed,
  },
  {
    label: "Support",
    pathname: ApiRoutes.Support,
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
