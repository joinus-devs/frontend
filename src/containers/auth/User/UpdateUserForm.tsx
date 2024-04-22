import { updateUserInfo, useGetMe, useGetUser } from "@/apis";
import { QueryParser } from "@/utils";
import { Avatar, Box, Button, Center, Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface UserData {
  imageUpload: FileList;
  editName: string;
}

const basicProfileImage =
  process.env.NEXT_PUBLIC_BASIC_PROFILE_IMAGE ?? "/noneUserImg.webp";

const UpdateUserForm = () => {
  const router = useRouter();
  const userId = QueryParser.toNumber(router.query.id);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: me } = useGetMe();
  const { data: userData } = useGetUser(userId);

  const [imagePreview, setImagePreview] = useState<string>(basicProfileImage);
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
    if (!userData) return;
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(userData?.profile);
    }
  }, [image, userData]);

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
    <Flex
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      direction={"column"}
      align={"center"}
      gap={4}
    >
      <Flex direction={"column"} gap={4} align={"center"}>
        <Avatar
          size="2xl"
          name={me?.name}
          src={imagePreview || "/noneUserImg.webp"}
        />
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
        <Flex gap={2}>
          <Button onClick={handleSelectImage} variant={"outline"}>
            사진 선택
          </Button>
          <Button onClick={handleRemoveImage} variant={"outline"}>
            삭제
          </Button>
        </Flex>
      </Flex>
      <Input
        type="text"
        {...register("editName")}
        width="auto"
        placeholder={me?.name}
      />

      <Button type="submit" variant={"outline"}>
        적용
      </Button>
    </Flex>
  );
};

export default UpdateUserForm;
