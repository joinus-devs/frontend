import { Box, Flex } from "@chakra-ui/react";
import { Template } from "./Template";

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

const dummyStaffMembers = [
  {
    id: 20,
    name: "김재훈",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 21,
    name: "이민훈",
    imgSrc: "/noneUserImg.webp",
  },
  {
    id: 22,
    name: "윤승휘",
    imgSrc: "/noneUserImg.webp",
  },
];

const GroupMember = () => {
  return (
    <Box minH={800}>
      <Flex gap={8} direction={"column"} pt={8}>
        <Template dummyGroupMember={dummyStaffMembers} header="Staff" />
        <Template dummyGroupMember={dummyGroupMember} header="User" />
      </Flex>
    </Box>
  );
};

export default GroupMember;
