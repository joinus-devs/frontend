import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";

interface SetBgImageProps {
  setBgImg: React.Dispatch<React.SetStateAction<number>>;
}

const bgImgList = [0, 1, 2, 3];

export const SetBgImage = ({ setBgImg }: SetBgImageProps) => {
  return (
    <Flex position={"absolute"} bottom={0} right={0} gap={2}>
      {bgImgList.map((v, i) => (
        <Box
          key={`bgImg_${i}`}
          borderRadius={8}
          overflow={"hidden"}
          width={16}
          height={16}
          position={"relative"}
          onClick={() => setBgImg(v)}
          as="button"
        >
          <Image
            src={`/group_chat${v}.jpg`}
            alt="group_chat"
            fill
            style={{ objectFit: "cover" }}
            sizes={"100%"}
          />
        </Box>
      ))}
    </Flex>
  );
};
