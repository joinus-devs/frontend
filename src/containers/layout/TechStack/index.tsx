import { Flex, Heading, Link } from "@chakra-ui/react";
import { libraries } from "@/constants";

const TechStack = () => {
  return (
    <Flex flex={1} direction={"column"} gap={8}>
      <Heading as={"h3"} size={"lg"}>
        Stack
      </Heading>
      <Flex flex={1}>
        <Flex flex={1} direction={"column"} gap={6}>
          <Heading as={"h4"} size={"md"}>
            Frontend
          </Heading>
          <Flex gap={4} direction={"column"} fontSize={16}>
            {libraries.frontend.map((lib, i) => {
              return (
                <Link key={`frontend_${i}`} href={lib.link} target={"_blank"}>
                  {lib.name}
                </Link>
              );
            })}
          </Flex>
        </Flex>
        <Flex flex={1} direction={"column"} gap={6}>
          <Heading as={"h4"} size={"md"}>
            Backend
          </Heading>
          <Flex gap={4} direction={"column"} fontSize={16}>
            {libraries.backend.map((lib, i) => {
              return (
                <Link key={`backend_${i}`} href={lib.link} target={"_blank"}>
                  {lib.name}
                </Link>
              );
            })}
          </Flex>
        </Flex>
        <Flex flex={1} direction={"column"} gap={6}>
          <Heading as={"h4"} size={"md"}>
            Infra
          </Heading>
          <Flex gap={4} direction={"column"} fontSize={16}>
            {libraries.infra.map((lib, i) => {
              return (
                <Link key={`infra_${i}`} href={lib.link} target={"_blank"}>
                  {lib.name}
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TechStack;
