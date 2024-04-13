import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const EmptyDataPlaceholder = () => {
  return (
    <Flex direction={"column"} alignItems={"center"} mt={100} gap={8}>
      <Box position={"relative"} w={160} height={160}>
        <Image
          src={"/noneData.webp"}
          alt={"noneData"}
          fill
          sizes="100%"
          priority
        />
      </Box>
      <Text pl={6} fontWeight={"semibold"} fontStyle={"italic"}>
        데이터가 없습니다. 첫번째로 작성을 해보세요!
      </Text>
    </Flex>
  );
};

export default EmptyDataPlaceholder;
