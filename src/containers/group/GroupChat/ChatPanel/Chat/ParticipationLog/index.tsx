import { CircleImg } from "@/components";
import { ApiResponseChat } from "@/types/chat";
import { FormatMemberValue } from "@/utils/group";
import { Flex, Text } from "@chakra-ui/react";
interface ParticipationLogProps {
  participantId: number;
  members: FormatMemberValue;
}
const ParticipationLog = ({
  participantId,
  members,
}: ParticipationLogProps) => {
  const member = members[Number(participantId)];
  return (
    <>
      {member && (
        <Flex justifyContent={"center"} py={1}>
          <Flex
            shadow={"md"}
            p={2}
            justifyContent={"center"}
            alignItems={"center"}
            opacity={0.8}
            borderRadius={24}
            bg={"white"}
            gap={2}
          >
            <CircleImg
              imgSrc={member.profile}
              alt={`${member.name}_profileImg`}
              size={8}
            />
            <Text>{member.name} 님이 입장하셨습니다.</Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ParticipationLog;
