import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";

const GroupDescription = () => {
  return (
    <Box overflow={"hidden"} p={8}>
      <Flex>
        <Heading size={"lg"} p={4} pb={8}>
          음악속으로
        </Heading>
        <Tag p={2} h={8} fontSize={16}>
          음악
        </Tag>
      </Flex>
      <Text fontSize={"lg"} pl={4}>
        안녕하세요! 음악을 사랑하는 모임입니다..
      </Text>
    </Box>
  );
};

export default GroupDescription;
