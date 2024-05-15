import { imgs } from "@/types";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";

interface HotGroupImageProps {
  data: imgs;
}
const HotGroupImage = ({ data }: HotGroupImageProps) => {
  return (
    <Flex
      flex={1}
      p={12}
      justifyContent={"center"}
      minH={300}
      w={"100%"}
      overflow={"hidden"}
      boxShadow={"md"}
      position={"relative"}
    >
      <Image
        src={data.url}
        alt={"subimg"}
        fill
        sizes="100%"
        style={{ objectFit: "cover" }}
        priority
      />
    </Flex>
  );
};

export default HotGroupImage;
