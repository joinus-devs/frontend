import { DefaultLayout } from "@/components";
import GroupInfo from "@/containers/GroupInfo";
import Head from "next/head";
import { useRouter } from "next/router";

export interface GroupDetailProps {
  group: {
    imgSrc: string;
    name: string;
    category: string;
    description: string;
    minAge: number;
    maxAge: number;
    maxParticipants: number;
  };
}

const GroupDetail = () => {
  const router = useRouter();
  const groupId = router.query.id;
  //해당 grouId를 통해 data를 가져오고 , 해당data를 props로 넘겨줍니다.

  const dummyData = {
    imgSrc: "/groupTestImg.webp",
    name: "음악속으로",
    category: "음악",
    description: "안녕하세요! 음악을 좋아하는 사람들의 모임입니다.",
    minAge: 0,
    maxAge: 100,
    maxParticipants: 10,
  };

  return (
    <>
      <Head>
        <title>Join Us - GroupDetail</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <GroupInfo group={dummyData} />
      </DefaultLayout>
    </>
  );
};

export default GroupDetail;
