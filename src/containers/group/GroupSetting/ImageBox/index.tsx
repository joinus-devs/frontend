import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import UploadImg from "../UploadImg/indetx";
import { useModalStore } from "@/stores";
import { useCallback } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

interface ImgProps {
  type: string;
  url: string;
}

interface ImageBoxProps {
  imgData: ImgProps[];
  setImgData: React.Dispatch<React.SetStateAction<ImgProps[]>>;
}

const ImageBox = ({ imgData, setImgData }: ImageBoxProps) => {
  const { openConfirm } = useModalStore(["openConfirm"]);

  const handleMainSettingClick = useCallback(
    (v: ImgProps) => {
      const newImg = imgData.map((img) => {
        if (img.type === "main") {
          return { ...img, type: "sub" };
        }
        if (img.url === v.url) {
          return { ...img, type: "main" };
        }
        return img;
      });
      setImgData(newImg);
    },
    [imgData, setImgData]
  );

  const handleDeleteClick = useCallback(
    (index: number) => {
      openConfirm({
        title: "Delete Image",
        content: "해당이미지를 삭제하시겠습니까?",
        onConfirm: () => {
          const newImages = imgData.filter((_, index2) => index !== index2);
          setImgData(newImages);
        },
      });
    },
    [imgData, openConfirm, setImgData]
  );

  return (
    <Flex
      direction={"column"}
      gap={8}
      boxShadow={"lg"}
      maxH={"800px"}
      overflowY={"auto"}
      overflowX={"hidden"}
    >
      <UploadImg />
      <Grid
        gap={4}
        w={"100%"}
        h={"100%"}
        templateColumns="repeat(3, 1fr)"
        boxShadow={"lg"}
        p={4}
      >
        {imgData.map((v, index) => {
          return (
            <Box key={index} position={"relative"}>
              {v.type === "main" && (
                <Icon
                  as={FaCheck}
                  color={"primary.500"}
                  fontSize={32}
                  position={"absolute"}
                  top={-2}
                  right={-2}
                  zIndex={1}
                />
              )}

              <Popover trigger={"click"} placement="bottom">
                <PopoverTrigger>
                  <Box w={"100%"} h={200} position={"relative"} shadow={"lg"}>
                    <Image
                      src={v.url}
                      fill
                      style={{ objectFit: "cover" }}
                      alt="group image"
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent width={48}>
                  <PopoverHeader fontWeight="semibold">설정</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <Flex gap={2} p={2}>
                    <Button flex={1} onClick={() => handleMainSettingClick(v)}>
                      {v.type === "main" ? "main해제" : "main설정"}
                    </Button>
                    <Button flex={1} onClick={() => handleDeleteClick(index)}>
                      삭제
                    </Button>
                  </Flex>
                </PopoverContent>
              </Popover>
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default ImageBox;
