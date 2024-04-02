import { CircleImg } from "@/components";
import { User } from "@/types";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Accordion as _Accordion,
  Text,
} from "@chakra-ui/react";
import { MdOnlinePrediction } from "react-icons/md";

interface AccordionProps {
  members: {
    profile: string;
    name: string;
  }[];
}

const Accordion = ({ members }: AccordionProps) => {
  return (
    <_Accordion allowToggle>
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
            {members.map((member, i) => {
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
                  {member && member.profile && (
                    <CircleImg
                      imgSrc={member.profile}
                      alt="member_profile"
                      size={16}
                    />
                  )}
                  {member && member.name && <Text>{member.name}</Text>}
                </Flex>
              );
            })}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </_Accordion>
  );
};

export default Accordion;
