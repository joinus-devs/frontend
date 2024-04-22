import { User } from "@/types";
import { formatBirth, formatPhone } from "@/utils";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

interface UserInfoProps {
  user: User;
}

interface UserFormat {
  key: string;
  value: string;
  icon: IconType;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const formatUser: UserFormat[] = useMemo(() => {
    const formatedPhone = formatPhone(user.phone);
    return [
      { key: "이름", value: user.name, icon: FaUser },
      {
        key: "생년월일",
        value: formatBirth(user.birth),
        icon: FaBirthdayCake,
      },
      {
        key: "전화번호",
        value: formatedPhone,
        icon: FaPhone,
      },
      {
        key: "이메일",
        value: user.email,
        icon: MdEmail,
      },
    ];
  }, [user.birth, user.email, user.name, user.phone]);

  return (
    <Grid
      gap={4}
      templateColumns="repeat(1)"
      w={"100%"}
      borderRadius={16}
      flex={1}
    >
      {formatUser.map((meta) => {
        return (
          <Card key={meta.key} boxShadow={"xl"}>
            <Stack>
              <CardHeader p={2} pt={4} pl={4}>
                <Flex alignItems={"center"} gap={2}>
                  <Icon as={meta.icon} fontSize={24} />
                  <Heading size={"md"}>{meta.key}</Heading>
                </Flex>
              </CardHeader>
              <CardBody p={2} pb={4} pl={4} fontWeight={600}>
                {meta.value}
              </CardBody>
            </Stack>
          </Card>
        );
      })}
    </Grid>
  );
};
export default UserInfo;
