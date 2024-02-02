import { Flex, Heading, Text } from "@chakra-ui/react";
import { ContactIconBox } from "@/containers";

const Contact = () => {
  return (
    <Flex flex={1} direction={"column"} gap={8}>
      <Heading as={"h3"} size={"lg"}>
        Contact
      </Heading>
      <Flex flex={1}>
        <Flex flex={1} direction={"column"} gap={6}>
          <Heading as={"h4"} size={"md"}>
            Frontend
          </Heading>
          <Flex gap={4} direction={"column"}>
            <Flex gap={4} fontSize={16}>
              <Text flex={1}>jaehoon Kim</Text>
              <ContactIconBox
                github="https://github.com/rlawogns123"
                blog="https://velog.io/@rlawogns/posts"
              />
            </Flex>
            <Flex gap={4} fontSize={16}>
              <Text flex={1}>seonghwi Yoon</Text>
              <ContactIconBox
                github="https://github.com/Yoonhwi"
                blog="https://winhwi.tistory.com/"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} gap={6} direction={"column"}>
          <Heading as={"h4"} size={"md"}>
            Backend
          </Heading>
          <Flex gap={4} fontSize={16}>
            <Text flex={1}>minhoon Lee</Text>
            <ContactIconBox
              github="https://github.com/Lee-Minhoon"
              blog="https://hackids.tistory.com/"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
