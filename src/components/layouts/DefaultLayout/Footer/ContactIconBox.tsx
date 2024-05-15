import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FaBlog, FaGithub } from "react-icons/fa";

interface ContactIconBoxProps {
  github: string;
  blog: string;
  name: string;
}

const ContactIconBox = ({ github, blog, name }: ContactIconBoxProps) => {
  return (
    <Flex gap={4} fontSize={16} alignItems={"center"}>
      <Text flex={1}>{name}</Text>
      <Flex gap={4} flex={1}>
        <Link
          href={github}
          target={"_blank"}
          _hover={{ transform: "scale(1.5)" }}
        >
          <Icon as={FaGithub} />
        </Link>
        <Link
          href={blog}
          target={"_blank"}
          _hover={{ transform: "scale(1.5)" }}
        >
          <Icon as={FaBlog} mb={"1px"} />
        </Link>
      </Flex>
    </Flex>
  );
};

export default ContactIconBox;
