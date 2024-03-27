import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
  Box,
  Heading,
  Collapse,
} from "@chakra-ui/react";
import { CircleImg, InputWithButton } from "@/components";
import { MdOnlinePrediction } from "react-icons/md";
import { Group } from "@/types";
import { useGetGroupMembers } from "@/apis";
import { IoIosSearch } from "react-icons/io";

interface OnlineMemberProps {
  group: Group;
  viewOnlineMember: boolean;
}
export const OnlineMember = ({
  group,
  viewOnlineMember,
}: OnlineMemberProps) => {
  const { data: members } = useGetGroupMembers(group.id!);
  const handleSubmit = () => {};
  return (
    <Box as={Collapse} in={viewOnlineMember} flex={1} animateOpacity>
      <Flex direction={"column"} gap={5}>
        <Heading size={"lg"} opacity={0.9}>
          Messages
        </Heading>
        <InputWithButton
          placeholder="member name"
          hanldeSubmit={handleSubmit}
          icon={IoIosSearch}
          boxStyle={{ position: "relative", alignItems: "center" }}
          buttonStyle={{ fontSize: 28, right: 0 }}
        />

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
      </Flex>
    </Box>
  );
};
