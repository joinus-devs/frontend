import { Group } from "@/types";
import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";

interface GroupDescriptionProps {
  group?: Group;
}

const GroupDescription = ({ group }: GroupDescriptionProps) => {
  return (
    <Box overflow={"hidden"} p={8}>
      <Flex>
        <Heading size={"lg"} p={4} pb={8}>
          {group?.name ?? ""}
        </Heading>
        <Tag p={2} h={8} fontSize={16}>
          IT
        </Tag>
      </Flex>
      <Text fontSize={"lg"} pl={4}>
        {group?.description ?? ""}
      </Text>
    </Box>
  );
};

export default GroupDescription;
