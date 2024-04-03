import { CircleImg } from "@/components";
import { ApiResponseChat } from "@/types/chat";
import { FormatMemberValue } from "@/utils/group";
import { Flex, Text } from "@chakra-ui/react";
interface ParticipationLogProps {
  log: ApiResponseChat;
  members: FormatMemberValue;
}
const ParticipationLog = ({ log, members }: ParticipationLogProps) => {
  const logId = log.message.split(" ")[2];
  const member = members[Number(logId)];

  console.log("logId", logId);
  return (
    <>
      {member && (
        <Flex justifyContent={"center"}>
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
