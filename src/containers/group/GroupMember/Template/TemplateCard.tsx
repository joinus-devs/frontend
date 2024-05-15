import { User } from "@/types";
import { Card, CardBody, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { FaSquarePhone } from "react-icons/fa6";
import { useMemo } from "react";
import { CardText } from ".";
import { formatBirth, formatPhone } from "@/utils";

interface TemplateCardProps {
  user: User;
}

const TemplateCard = ({ user }: TemplateCardProps) => {
  const formatedPhone = formatPhone(user.phone);

  const userMeta = useMemo(() => {
    return [
      {
        icon: FaBirthdayCake,
        text: formatBirth(user.birth),
      },
      {
        icon: AiFillMail,
        text: user.email,
      },
      {
        icon: FaSquarePhone,
        text: formatedPhone,
      },
    ];
  }, [formatedPhone, user.birth, user.email]);

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
