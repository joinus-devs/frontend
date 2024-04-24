import { MainImage, SubImages } from "@/components";
import { Group } from "@/types";
import { Flex } from "@chakra-ui/react";

interface ImageViewProps {
  data: Group;
}
const none = "/none-groupimg.webp";

const ImageViewer = ({ data }: ImageViewProps) => {
  const mainImg = data.images.find((img) => img.type === "main")?.url ?? none;
  const subImgs = data.images.filter((img) => img.type === "sub");

  return (
    <Flex flex={1} direction={"column"} overflow={"hidden"}>
      <MainImage src={mainImg} />
      {subImgs.length > 0 && <SubImages imgs={subImgs} />}
    </Flex>
  );
};

export default ImageViewer;
