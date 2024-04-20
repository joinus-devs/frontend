import { CircleImg } from "@/components";
import { BoxProps, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOnlinePrediction } from "react-icons/md";

interface Members {
  profile: string;
  name: string;
  id: number;
}
interface AccordionProps {
  parentHeight: BoxProps["h"];
  members: Members[];
}

const Accordion = ({ members, parentHeight }: AccordionProps) => {
  console.log("members", members);
  return (
    <Flex overflowY={"auto"} direction={"column"} gap={4} maxH={parentHeight}>
      {members.map((member, i) => {
        console.log("member", member);
        return (
          <Flex alignItems={"center"} key={`group_member${i}`} gap={2} flex={1}>
            <Icon as={MdOnlinePrediction} fontSize={24} fill={"primary.500"} />
            {member && member.profile && (
              <CircleImg
                imgSrc={member.profile}
                alt="member_profile"
                size={12}
              />
            )}
            {member && member.name && <Text>{member.name}</Text>}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Accordion;
