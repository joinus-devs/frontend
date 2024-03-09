import { usePostImg } from "@/apis/storage";
import { AspectRatio, Flex } from "@chakra-ui/react";
import { ChangeEvent, useCallback } from "react";
import Motion from "./Motion";

const UploadImg = () => {
  const { mutate: uploadImg } = usePostImg();

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      uploadImg(formData);
      event.target.files = null;
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
