import { Group } from "@/types";
import { formatISO } from "@/utils";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { GoAlert } from "react-icons/go";
import { HiOutlineCake } from "react-icons/hi";
import { PiGenderIntersex } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { useMemo } from "react";
import { IconType } from "react-icons";

interface GroupCardInfoProps {
  group: Group;
}

interface GroupMeta {
  key: string;
  value: string;
  icon: IconType;
}

const GroupCardInfo = ({ group }: GroupCardInfoProps) => {
  const groupMeta: GroupMeta[] = useMemo(() => {
    const groupAge =
      group.minimum_age === 0 && group.maximum_age === 100
        ? "제한없음"
        : `${group.minimum_age} ~ ${group.maximum_age}세 참여`;
    return [
      {
        key: "생성일",
        value: formatISO(group.created_at),
        icon: HiOutlineCake,
      },
      {
        key: "성별",
        value: group.sex ? "남성만" : "여성만",
        icon: PiGenderIntersex,
      },
      {
        key: "나이",
        value: groupAge,
        icon: GoAlert,
      },
      {
        key: "인원",
        value: `${group.capacity}명`,
        icon: GrGroup,
      },
    ];
  }, [
    group.capacity,
    group.created_at,
    group.maximum_age,
    group.minimum_age,
    group.sex,
  ]);

  return (
    <Flex gap={2} flex={1} alignItems={"center"} py={4}>
      <Flex direction={"column"} gap={2} w={32}>
        {groupMeta.map((data) => {
          return (
            <Flex gap={2} key={data.key} alignItems={"center"}>
              <Icon as={data.icon} h={"6"} w={"6"} />
              <Heading size={"sm"}>{data.key}</Heading>
            </Flex>
          );
        })}
      </Flex>
      <Flex direction={"column"} gap={2} flex={2}>
        {groupMeta.map((data) => {
          return (
            <Flex key={data.key}>
              <Text>{data.value}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default GroupCardInfo;
