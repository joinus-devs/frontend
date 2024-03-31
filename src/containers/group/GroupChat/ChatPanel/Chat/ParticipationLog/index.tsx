import { Flex } from "@chakra-ui/react";
import { ChatLog } from "../..";
interface ParticipationLogProps {
  log: ChatLog;
}
const ParticipationLog = ({ log }: ParticipationLogProps) => {
  return <Flex justifyContent={"center"}>{log.body.message}</Flex>;
};

export default ParticipationLog;
