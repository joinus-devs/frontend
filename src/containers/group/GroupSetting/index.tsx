import { PageRoutes, ApiRoutes } from "@/constants";
import feed from "@/pages/group/[id]/feed";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import {
  Box,
  Grid,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Flex,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import router from "next/router";
import { useCallback, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

interface ImgProps {
  type: string;
  url: string;
}

interface ImgSettingProps {
  imgData: ImgProps[];
  setImgData: React.Dispatch<React.SetStateAction<ImgProps[]>>;
}
const GroupSetting = ({ imgData, setImgData }: ImgSettingProps) => {
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
    <Grid
      gap={4}
      w={"100%"}
      h={"100%"}
      templateColumns="repeat(3, 1fr)"
      boxShadow={"md"}
      p={4}
      maxH={"500px"}
      overflowY={"auto"}
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
  );
};

export default GroupSetting;
