import { useGetMe } from "@/apis";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { useRouter } from "next/router";
import { match } from "path-to-regexp";
import { useEffect } from "react";
import RequiredLoginModal from "./RequiredLoginModal";

const blackList = [
  PageRoutes.Group,
  PageRoutes.GroupHome,
  PageRoutes.GroupMember,
  PageRoutes.GroupFeed,
  PageRoutes.GroupNotice,
  PageRoutes.GroupCreateFeed,
  PageRoutes.GroupModifyFeed,
  PageRoutes.GroupPermissionMember,
  PageRoutes.GroupSetting,
  PageRoutes.User,
];

const Firewall = () => {
  const { data: me, isFetching } = useGetMe();
  const router = useRouter();
  const { openModal } = useModalStore(["openModal"]);

  useEffect(() => {
    if (!router.isReady || isFetching) return;

    // Check if the current page is in the blacklist
    if (!blackList.some((path) => match(path)(router.pathname))) return;

    if (!me) {
      router
        .push({
          pathname: toUrl(PageRoutes.SignIn),
          query: {
            redirect: router.asPath,
          },
        })
        .then(() => {
          openModal(RequiredLoginModal, {});
        });
    }
  }, [isFetching, me, openModal, router]);

  return null;
};

export default Firewall;
