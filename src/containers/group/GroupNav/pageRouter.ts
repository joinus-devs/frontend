import { PageRoutes } from "@/constants";
import { toUrl } from "@/utils";
import { NextRouter } from "next/router";

export const pageRouter = (name: string, id: number, router: NextRouter) => {
  switch (name) {
    case "Home":
      return router.push(toUrl(PageRoutes.GroupHome, { id }));
    case "Member":
      return router.push(toUrl(PageRoutes.GroupMember, { id }));
    case "Feed":
      return router.push(toUrl(PageRoutes.GroupFeed, { id }));
    case "Notice":
      return router.push(toUrl(PageRoutes.GroupNotice, { id }));
  }
};
