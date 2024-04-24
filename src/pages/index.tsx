import { DefaultLayout } from "@/components";
import { HotFeed, HotGroup, HotUser } from "@/containers";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Join Us - Main</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Flex direction={"column"} gap={32} py={12} justify={"center"}>
          <HotGroup />
          <HotFeed />
          <HotUser />
        </Flex>
      </DefaultLayout>
    </>
  );
}
