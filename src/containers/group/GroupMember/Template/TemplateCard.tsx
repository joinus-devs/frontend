import { User } from "@/types";
import { Card, CardBody, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { useMemo } from "react";
import { CardText } from ".";

interface TemplateCardProps {
  user: User;
}

const TemplateCard = ({ user }: TemplateCardProps) => {
  const date = new Date(user.birth).toISOString().split("T")[0].split("-");
  const formatBirth = date[0].slice(2) + ". " + date[1] + ". " + date[2];
  const formatPhone = user.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");

  const userMeta = useMemo(() => {
    return [
      {
        icon: FaBirthdayCake,
        text: formatBirth,
      },
      {
        icon: AiFillMail,
        text: user.email,
      },
      {
        icon: FaSquarePhone,
        text: formatPhone,
      },
    ];
  }, [formatBirth, formatPhone, user.email]);

  return (
    <Card variant={"unstyled"} flex={1}>
      <CardBody>
        <Flex gap={4} direction={"column"}>
          <Heading size={"md"}>{user.name}</Heading>
          {userMeta.map((meta, i) => {
            return (
              <CardText
                icon={meta.icon}
                text={meta.text}
                key={`usermeta_${i}`}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TemplateCard;
