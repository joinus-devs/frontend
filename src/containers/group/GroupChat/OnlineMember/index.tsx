import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CircleImg } from "@/components";
import { MdOnlinePrediction } from "react-icons/md";
import { Group } from "@/types";
import { useGetGroupMembers } from "@/apis";

interface OnlineMemberProps {
  group: Group;
}
export const OnlineMember = ({ group }: OnlineMemberProps) => {
  const { data: members } = useGetGroupMembers(group.id!);
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <AccordionButton>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={16}>Online</Text>
            <AccordionIcon mt={0.5} />
          </Flex>
        </AccordionButton>
        <AccordionPanel>
          <Flex
            h={1137}
            shadow={"lg"}
            maxH={1137}
            overflowY={"auto"}
            direction={"column"}
            gap={4}
            pl={4}
            pb={4}
          >
            {members?.data.map((member, i) => {
              return (
                <Flex
                  alignItems={"center"}
                  h={40}
                  key={`groupmember${i}`}
                  gap={4}
                >
                  <Icon
                    as={MdOnlinePrediction}
                    fontSize={28}
                    fill={"primary.500"}
                  />
                  <CircleImg
                    imgSrc={"/noneUserImg.webp"}
                    alt="group_img"
                    size={16}
                  />
                  <Text>{member.name}</Text>
                </Flex>
              );
            })}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
