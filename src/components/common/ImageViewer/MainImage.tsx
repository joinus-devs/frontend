import { Flex } from "@chakra-ui/react";
import Image from "next/image";

interface MainImageProps {
  src: string;
}

const MainImage = ({ src }: MainImageProps) => {
  return (
    <Flex bgColor={"white"} p={1}>
      <Flex
        flex={1}
        p={12}
        justifyContent={"center"}
        position={"relative"}
        minH={300}
        overflow={"hidden"}
        boxShadow={"md"}
      >
        <Image src={src} alt="group_mainimg" fill />
      </Flex>
    </Flex>
  );
};

export default MainImage;
