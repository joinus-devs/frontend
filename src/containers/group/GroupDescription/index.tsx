import { PageRoutes, toCategory } from "@/constants";
import { useUserRoleMatcher } from "@/hooks";
import { Group } from "@/types";
import { toUrl } from "@/utils";
import { Box, Flex, Heading, Icon, Tag, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosSettings } from "react-icons/io";

interface GroupDescriptionProps {
  group?: Group;
}

const GroupDescription = ({ group }: GroupDescriptionProps) => {
  const router = useRouter();

  return (
    <Box p={8} position={"relative"}>
      {useUserRoleMatcher(group?.id ?? 0, "admin") && (
        <Tooltip label="그룹설정" placement={"bottom-end"}>
          <Flex
            position={"absolute"}
            top={4}
            right={0}
            as={"button"}
            onClick={() =>
              router.push(toUrl(PageRoutes.GroupSetting, { id: group?.id }))
            }
          >
            <Icon as={IoIosSettings} fontSize={24} />
          </Flex>
        </Tooltip>
      )}

      <Flex>
        <Heading size={"lg"} p={4} pb={8}>
          {group?.name ?? ""}
        </Heading>
        {group?.categories.map((category, index) => {
          return (
            <Tag
              p={4}
              h={8}
              fontSize={16}
              key={index}
              fontWeight={"semibold"}
              mr={2}
              variant={"outline"}
            >
              {toCategory[category]}
            </Tag>
          );
        })}
      </Flex>
      <Text fontSize={"lg"} pl={4}>
        {group?.description ?? ""}
      </Text>
    </Box>
  );
};

export default GroupDescription;
