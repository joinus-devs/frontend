import { useRouter } from "next/router";

const useGetPathname = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const name = pathname.split("/")[3];
  const name2 = pathname.split("/")[4];

  return { name, name2 };
};
export default useGetPathname;
