import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface CircleImgProps {
  imgSrc: string;
  alt: string;
  size: number;
  style?: React.CSSProperties;
}

const CircleImg = ({ imgSrc, alt, size, style }: CircleImgProps) => {
  return (
    <Box
      borderRadius={"50%"}
      overflow={"hidden"}
      width={size}
      height={size}
      minW={size}
      position={"relative"}
      style={style}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="100%"
        objectFit="cover"
        priority
      />
    </Box>
  );
};

export default CircleImg;
