import { CustomBtn } from "@/containers";
import { Flex, Heading, Text } from "@chakra-ui/react";

const CreatePanel = () => {
  return (
    <Flex direction={"column"} flex={1} zIndex={1} gap={12} py={48} px={12}>
      <Flex color={"white"} direction={"column"} gap={4}>
        <Heading>Welcome</Heading>
        <Heading pl={6}>Create Group</Heading>
      </Flex>
      <Flex
        color={"white"}
        fontSize={18}
        fontWeight={"bold"}
        direction={"column"}
        gap={2}
      >
        <Text>환영합니다!</Text>
        <Text>그룹을 만들어 취향과 관심을 공유하고</Text>
        <Text>새로운 경험을 만들어 보세요.</Text>
      </Flex>
      <Flex gap={8}>
        <CustomBtn text="돌아가기" />
        <CustomBtn text="생성하기" type="submit" />
      </Flex>
    </Flex>
  );
};

export default CreatePanel;
