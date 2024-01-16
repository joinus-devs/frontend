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
    <Box borderRadius={"50%"} overflow={"hidden"} style={style}>
      <Image src={imgSrc} alt={alt} width={size} height={size} />
    </Box>
  );
};

export default CircleImg;
