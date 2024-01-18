import { Drawer } from "@/containers";
import {
  Box,
  Flex,
  Heading,
  Icon,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/router";

const DefaultLayoutHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  const handleSearch = useCallback(() => {}, []);

  const router = useRouter();

  return (
    <>
      <Flex
        as={"header"}
        w={"100%"}
        alignItems={"center"}
        position={"relative"}
        h={20}
        mt={4}
        mb={4}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
          flex={1}
          as={"button"}
          onClick={() => router.push("/")}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={120}
            backgroundColor={"yellow.200"}
            h={"100%"}
          >
            <Heading size={"lg"} color={"white"} textAlign={"center"}>
              Logo
            </Heading>
          </Flex>
        </Flex>
        <Flex flex={2} justifyContent={"center"} alignItems={"end"} h={"100%"}>
          <Input
            placeholder={"그룹명이나 카테고리를 검색해보세요."}
            width={"60%"}
          />
        </Flex>
        <Box flex={1} />
        <Box
          as={"button"}
          position={"absolute"}
          right={0}
          bottom={0}
          display={"inline-flex"}
          onClick={onOpen}
        >
          <Icon as={FiAlignJustify} fontSize={32} />
        </Box>
        <Drawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </Flex>
    </>
  );
};

export default DefaultLayoutHeader;
