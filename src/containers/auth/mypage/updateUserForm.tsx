import { updateUserInfo } from "@/apis";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import { toUrl } from "@/utils";
import { Avatar, Box, Button, Center, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

interface UserData {
  imageUpload: FileList;
  editName: string;
}

const UpdateUserForm = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: me } = useQuery<User>({
    queryKey: [toUrl(ApiRoutes.Me), null],
  });
  const basicProfileImage = process.env.NEXT_PUBLIC_BASIC_PROFILE_IMAGE;
  const [imagePreview, setImagePreview] = useState<string>("");
  const [hasFormData, setHasFormData] = useState<boolean>(false);
  const [basicImage, setBasicImage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserData>();

  const image = watch("imageUpload");

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(me?.profile as string);
    }
  }, [image, me?.profile]);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
    setHasFormData(true);
    setBasicImage(false);
  };

  const handleRemoveImage = () => {
    setImagePreview("/noneUserImg.webp");
    setBasicImage(true);
    setHasFormData(false);
  };

  const onSubmit = async (values: UserData) => {
    const formData = new FormData();
    if (values.imageUpload && values.imageUpload.length > 0) {
      formData.append("image", values.imageUpload[0]);
    }

    const id = me?.id as number;
    const name = values?.editName || me?.name;
    const profile = hasFormData
      ? formData
      : basicImage
        ? basicProfileImage
        : me?.profile;
    // const response = await updateUserInfo(id, name, profile);
    await updateUserInfo(id, name, profile);
  };

  return (
    <Box ml={44}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center mt={16}>
          <Avatar
            size="2xl"
            name={me?.name}
            src={imagePreview || "/noneUserImg.webp"}
          />
        </Center>

        <Center mt={8}>
          <Input
            {...register("imageUpload")}
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            ref={(e) => {
              fileInputRef.current = e;
              register("imageUpload").ref(e);
            }}
          />

          <Button onClick={handleSelectImage} variant={"outline"}>
            사진 선택
          </Button>
          <Button ml={4} onClick={handleRemoveImage} variant={"outline"}>
            삭제
          </Button>
        </Center>

        <Center mt={20}>
          <Input
            type="text"
            {...register("editName")}
            focusBorderColor="green.400"
            width="auto"
            placeholder={me?.name}
          />
        </Center>

        <Center mt={24} mb={24}>
          <Button type="submit" variant={"outline"}>
            적용
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default UpdateUserForm;
