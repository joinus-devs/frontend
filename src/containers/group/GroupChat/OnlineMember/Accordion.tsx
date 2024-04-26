import { CircleImg } from "@/components";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdOnlinePrediction } from "react-icons/md";

interface Members {
  profile: string;
  name: string;
  id: number;
}
interface AccordionProps {
  members: Members[];
}

const Accordion = ({ members }: AccordionProps) => {
  const copiedMembers: Members[] = Array(40).fill(members[0]);

  return (
    <Flex overflowY={"auto"} direction={"column"} gap={4} flex={1}>
      {copiedMembers.map((member, i) => {
        return (
          <Flex alignItems={"center"} key={`group_member${i}`} gap={2} flex={1}>
            <Icon as={MdOnlinePrediction} fontSize={24} fill={"primary.500"} />
            {member.profile && (
              <CircleImg
                imgSrc={member.profile}
                alt="member_profile"
                size={12}
              />
            )}
            {member.name && <Text>{member.name}</Text>}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Accordion;
