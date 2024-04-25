import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";

interface CircleImgProps {
  imgSrc: string;
  alt: string;
  size: number;
  isBorder?: boolean;
  style?: React.CSSProperties;
}

const CircleImg = ({
  imgSrc,
  alt,
  size,
  isBorder = false,
  style,
}: CircleImgProps) => {
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
        border={"1px solid #CBD5E0"}
        style={style}
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
          borderRadius={"full"}
          p={1}
          style={{
            background: "linear-gradient(to right, #2C5282, #4299E1,#00B5D8)",
          }}
        >
          <Center p={1} bgColor={"white"} borderRadius={"full"}>
            {innerCircle()}
          </Center>
        </Center>
      ) : (
        innerCircle()
      )}
    </>
  );
};

export default CircleImg;
