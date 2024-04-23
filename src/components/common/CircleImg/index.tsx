import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";

interface CircleImgProps {
  imgSrc: string;
  alt: string;
  size: number;
  isBorder?: boolean;
}

const CircleImg = ({ imgSrc, alt, size, isBorder = false }: CircleImgProps) => {
  const innerCircle = () => {
    return (
      <Box
        borderRadius={"full"}
        overflow={"hidden"}
        width={size}
        height={size}
        minW={size}
        position={"relative"}
        boxShadow={"xl"}
        border={"1px solid gray"}
      >
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>
    );
  };
  return (
    <>
      {isBorder ? (
        <Center
          w={size + 4}
          h={size + 4}
          borderRadius={"full"}
          border={"2px solid"}
        >
          {innerCircle()}
        </Center>
      ) : (
        innerCircle()
      )}
    </>
  );
};

export default CircleImg;
