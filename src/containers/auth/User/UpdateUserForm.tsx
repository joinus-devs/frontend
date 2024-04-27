import { useGetMe, usePostImg, useUpdtateUser } from "@/apis";
import { CircleImg } from "@/components";
import { ApiRoutes } from "@/constants";
import { User } from "@/types";
import { toUrl } from "@/utils";
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

interface UpdateUserFormProps {
  user: User;
}
const baseImg =
  process.env.NEXT_PUBLIC_BASIC_PROFILE_IMAGE ?? "/noneUserImg.webp";

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const { mutate: uploadImg } = usePostImg();
  const { mutate: updateUser } = useUpdtateUser(me?.id ?? 0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickCamera = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDeleteImg = useCallback(() => {
    if (!me) return;
    if (me.id !== user.id) return;
    updateUser(
      { ...me, profile: baseImg },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [toUrl(ApiRoutes.User, { id: me.id })],
          });
        },
      }
    );
  }, [me, queryClient, updateUser, user.id]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!me) return;
      if (me.id !== user.id) return;
      if (!event.target.files) return;
      const file = event.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      uploadImg(formData, {
        onSuccess: (data) => {
          const imgSrc = data.data;
          updateUser(
            { ...me, profile: imgSrc },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: [toUrl(ApiRoutes.User, { id: me.id })],
                });
              },
            }
          );
        },
      });
      event.target.files = null;
    },
    [me, queryClient, updateUser, uploadImg, user.id]
  );

  return (
    <Flex
      as={"form"}
      direction={"column"}
      align={"center"}
      flex={1}
      justifyContent={"center"}
      py={8}
      gap={2}
    >
      <Center  flexDir={"column"} gap={4} flex={1}>
        <CircleImg imgSrc={user.profile} alt="user_profile" size={60} />
        {me?.id === user.id && (
          <Flex gap={2}>
            <Input
              type="file"
              display={"none"}
              accept="image/*"
              ref={(e) => {
                inputRef.current = e;
              }}
              onChange={handleFileChange}
            />
            <Tooltip label="프로필변경">
              <IconButton aria-label="get_photobt" onClick={onClickCamera}>
                <Icon as={FaCamera}></Icon>
              </IconButton>
            </Tooltip>
            <Tooltip label="프로필삭제">
              <IconButton aria-label="delete_photobt" onClick={handleDeleteImg}>
                <Icon as={IoIosClose} h={"10"} w={"10"}></Icon>
              </IconButton>
            </Tooltip>
          </Flex>
        )}
      </Center>
    </Flex>
  );
};

export default UpdateUserForm;
