import { CircleImg } from "@/components";
import { Flex, Icon, Heading, Box, Text } from "@chakra-ui/react";
import { group } from "console";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { SetBgImage } from "../SetBgImage";
import React from "react";
import { Group } from "@/types";
import { useGetGroupMembers } from "@/apis";

interface ChatHeaderProps {
  viewOnlineMember: boolean;
  setViewOnlineMember: React.Dispatch<React.SetStateAction<boolean>>;
  group: Group;
  setBgImg: React.Dispatch<React.SetStateAction<number>>;
}

const ChatHeader = ({
  viewOnlineMember,
  setViewOnlineMember,
  group,
  setBgImg,
}: ChatHeaderProps) => {
  const { data } = useGetGroupMembers(group.id!);
  return (
    <Flex alignItems={"center"} gap={4} position={"relative"}>
      <Box as="button" position={"absolute"} top={-2} right={0}>
        {viewOnlineMember ? (
          <Icon
            as={MdArrowForwardIos}
            fontSize={24}
            onClick={() => setViewOnlineMember(false)}
          />
        ) : (
          <Icon
            as={BsFillPersonLinesFill}
            fontSize={24}
            onClick={() => setViewOnlineMember(true)}
          />
        )}
      </Box>
      <CircleImg imgSrc={"/none-groupimg.webp"} alt="group_img" size={24} />
      <Flex direction={"column"} gap={2}>
        <Heading size={"lg"} opacity={0.9}>
          {group?.name}
        </Heading>
        <Text opacity={0.6}>{data?.data.length} members</Text>
        <SetBgImage setBgImg={setBgImg} />
      </Flex>
    </Flex>
  );
};

export default ChatHeader;
