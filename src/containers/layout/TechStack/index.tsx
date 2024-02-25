import { Flex, Heading, Link } from "@chakra-ui/react";
import { libraries, libs } from "@/constants";

const TechStack = () => {
  return (
    <Flex flex={1} direction={"column"} gap={8}>
      <Heading as={"h3"} size={"lg"}>
        Stack
      </Heading>
      <Flex flex={1}>
        {libs.map((data, index) => {
          return (
            <Flex
              flex={1}
              direction={"column"}
              gap={6}
              key={`${data.head}_${index}`}
            >
              <Heading as={"h4"} size={"md"}>
                {data.head}
              </Heading>
              <Flex gap={4} direction={"column"} fontSize={16}>
                {data.libraries.map((lib, i) => {
                  return (
                    <Link
                      key={`${data.head}_lib_${i}`}
                      href={lib.link}
                      target={"_blank"}
                    >
                      {lib.name}
                    </Link>
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default TechStack;
