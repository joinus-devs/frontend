import { Box } from "@chakra-ui/react";
import Image from "next/image";

const GroupBanner = () => {
  return (
    <Box
      w={"100%"}
      h={300}
      overflow={"hidden"}
      position={"relative"}
      shadow={"lg"}
    >
      <Image
        src={"/none-groupimg.webp"}
        alt="groupImg"
        fill
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
};

export default GroupBanner;
