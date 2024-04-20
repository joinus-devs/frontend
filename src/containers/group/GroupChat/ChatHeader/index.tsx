import { useGetGroupMembers } from "@/apis";
import { CircleImg } from "@/components";
import { Group } from "@/types";
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SetBgImage } from "../SetBgImage";

interface ChatHeaderProps {
  isWatchOnlineMember: boolean;
  setIsWatchOnlineMember: React.Dispatch<React.SetStateAction<boolean>>;
  group: Group;
  setBgImg: React.Dispatch<React.SetStateAction<number>>;
}

const ChatHeader = ({
  isWatchOnlineMember,
  setIsWatchOnlineMember,
  group,
  setBgImg,
}: ChatHeaderProps) => {
  const { data } = useGetGroupMembers(group.id!);
  return (
    <Flex gap={4} position={"relative"}>
      <CircleImg imgSrc={"/none-groupimg.webp"} alt="group_img" size={24} />
      <Flex justifyContent={"space-between"} wrap={"wrap"} flex={1}>
        <Flex direction={"column"} gap={2}>
          <Heading size={"lg"} opacity={0.9}>
            {group?.name}
          </Heading>
          <Text opacity={0.6}>{data?.data.length} members</Text>
        </Flex>
        <Flex direction={"column"} gap={1} align={"end"} flex={1}>
          {!isWatchOnlineMember && (
            <Tooltip label={"온라인 멤버"}>
              <IconButton variant={"ghost"} aria-label="back-bt">
                <Icon
                  as={BsFillPersonLinesFill}
                  onClick={() => setIsWatchOnlineMember(true)}
                  h={"6"}
                  w={"6"}
                />
              </IconButton>
            </Tooltip>
          )}
          <SetBgImage setBgImg={setBgImg} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatHeader;
