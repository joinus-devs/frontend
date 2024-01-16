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
import { dummyGroupMember } from "../../GroupMember";
import { CircleImg } from "@/components";
import { MdOnlinePrediction } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const OnlineMember = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem border={"none"}>
        <AccordionButton>
          <Flex alignItems={"center"} gap={4}>
            <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
              <Icon as={BsFillPersonLinesFill} fontSize={24} />
              <Text fontSize={16}>Online</Text>
            </Flex>
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
            {dummyGroupMember.map((member, i) => {
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
                  <CircleImg imgSrc={member.imgSrc} alt="group_img" size={80} />
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
