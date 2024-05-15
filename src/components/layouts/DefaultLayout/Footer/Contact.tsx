import { Flex, Heading } from "@chakra-ui/react";
import { ContactIconBox } from ".";

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
            <ContactIconBox
              github="https://github.com/rlawogns123"
              blog="https://velog.io/@rlawogns/posts"
              name="jaehoon Kim"
            />
            <ContactIconBox
              github="https://github.com/Yoonhwi"
              blog="https://winhwi.tistory.com/"
              name="seonghwi Yoon"
            />
          </Flex>
        </Flex>
        <Flex flex={1} gap={6} direction={"column"}>
          <Heading as={"h4"} size={"md"}>
            Backend
          </Heading>
          <ContactIconBox
            github="https://github.com/Lee-Minhoon"
            blog="https://hackids.tistory.com/"
            name="minhoon Lee"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
