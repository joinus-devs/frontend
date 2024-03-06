import { usePostImg, useUploadImg } from "@/apis/storage";
import { AspectRatio, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback } from "react";
import Motion from "./Motion";

const UploadImg = () => {
  const router = useRouter();
  const { mutate: uploadImg } = usePostImg();
  const { mutate: upload } = useUploadImg();

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      uploadImg(formData);
      // upload(formData);
    },
    [uploadImg]
  );

  return (
    <Flex p={4} w={"100%"} justifyContent={"center"}>
      <AspectRatio width="64" ratio={1}>
        <Motion onChange={handleFileChange} />
      </AspectRatio>
    </Flex>
  );
};

export default UploadImg;
