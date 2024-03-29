import { Flex, Icon, Link } from "@chakra-ui/react";
import { FaBlog, FaGithub } from "react-icons/fa";

interface ContactIconBoxProps {
  github: string;
  blog: string;
}

const ContactIconBox = ({ github, blog }: ContactIconBoxProps) => {
  return (
    <Flex gap={4} flex={1}>
      <Link
        href={github}
        target={"_blank"}
        _hover={{ transform: "scale(1.5)" }}
      >
        <Icon as={FaGithub} />
      </Link>
      <Link href={blog} target={"_blank"} _hover={{ transform: "scale(1.5)" }}>
        <Icon as={FaBlog} mb={"1px"} />
      </Link>
    </Flex>
  );
};

export default ContactIconBox;
