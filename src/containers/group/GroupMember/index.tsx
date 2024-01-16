import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";

export const dummyGroupMember = [
  {
    id: 1,
    name: "윤승휘",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 2,
    name: "이승준",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 3,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 5,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 5,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 1,
    name: "윤승휘",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 2,
    name: "이승준",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 3,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 5,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 1,
    name: "윤승휘",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 2,
    name: "이승준",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 3,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 4,
    name: "김민수",
    imgSrc: "/noneUserImg.webp",
  },
];

const GroupMember = () => {
  return (
    <Box minH={800}>
      <Grid pt={8} pb={8} templateColumns={"repeat(4,1fr)"} rowGap={12}>
        {dummyGroupMember.map((v) => (
          <GridItem key={v.id}>
            <Flex
              direction={"column"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              <Box borderRadius={"50%"} overflow={"hidden"}>
                <Image src={v.imgSrc} alt="userImg" width={120} height={120} />
              </Box>
              <Text>{v.name}</Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default GroupMember;
