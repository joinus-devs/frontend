import { CircleImg } from "@/components";
import { Heading, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const ImgBox = () => {
  const router = useRouter();
  return (
    <>
      <Box
        textAlign={"center"}
        boxShadow={"lg"}
        borderRadius={"50%"}
        p={4}
        onClick={() => router.push("/group/create")}
        as="button"
      >
        <Heading size={"md"}>Create Group</Heading>
        <CircleImg
          imgSrc={"/drawer_creategroup.jpg"}
          alt="create_group"
          size={52}
          style={{ margin: "0 auto" }}
        />
      </Box>
      <Box
        textAlign={"center"}
        boxShadow={"lg"}
        borderRadius={"50%"}
        p={4}
        onClick={() => router.push("/group")}
        as="button"
      >
        <Heading size={"md"}>Join Group</Heading>
        <CircleImg
          imgSrc={"/drawer_joingroup.jpg"}
          alt="create_group"
          size={52}
          style={{ margin: "0 auto" }}
        />
      </Box>
    </>
  );
};
