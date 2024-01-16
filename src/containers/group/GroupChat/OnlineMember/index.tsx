import { Box, Flex, Text } from "@chakra-ui/react";
import { dummyGroupMember } from "../../GroupMember";
import Image from "next/image";

export const OnlineMember = () => {
  return (
    <Flex
      h={1200}
      shadow={"lg"}
      maxH={1200}
      overflowY={"auto"}
      direction={"column"}
      gap={4}
      p={4}
    >
      {dummyGroupMember.map((member, i) => {
        return (
          <Flex
            alignItems={"center"}
            h={40}
            key={`groupmember${i}`}
            pl={4}
            gap={4}
          >
            <Box borderRadius={"50%"} overflow={"hidden"}>
              <Image
                src={member.imgSrc}
                alt="group_img"
                width={80}
                height={80}
              />
            </Box>
            <Text>{member.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
