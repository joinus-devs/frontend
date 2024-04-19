import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { SocialLoginButtons } from "@/containers";

import { PageRoutes } from "@/constants";
import { toUrl } from "@/utils";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";

interface UserData {
  username: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserData>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: UserData) => {
    const username = values.username;
    const password = values.password;

    await signIn("credentials", {
      username,
      password,
    }).then(() => {
      const redirect = router.query.redirect;

      if (redirect) {
        router.push(redirect.toString());
      } else {
        router.push(toUrl(PageRoutes.Home));
      }
    });
  };

  return (
    <>
      <Center bg="white" mt={70} h="100px" color="#25D366" fontSize={"3rem"}>
        <p>JoinUs</p>
      </Center>
      <Box maxW="sm" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.username}>
            <Input
              type="text"
              placeholder="아이디"
              {...register("username", {
                required: "아이디를 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.password}>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt={6}
            colorScheme="primary"
            type="submit"
            width="full"
            _hover={{ bg: "green.500" }}
          >
            로그인
          </Button>
        </form>
      </Box>

      <Center mt={4}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="ghost"
            color="gray"
            _hover={{ bg: "white" }}
            onClick={() => console.log("아이디 찾기")}
          >
            아이디 찾기
          </Button>
          <Button
            variant="ghost"
            color="gray"
            _hover={{ bg: "white" }}
            onClick={() => console.log("비밀번호 찾기")}
          >
            비밀번호 찾기
          </Button>
          <Button
            variant="ghost"
            color="gray"
            _hover={{ bg: "white" }}
            onClick={() => router.push("/register")}
          >
            회원가입
          </Button>
        </Stack>
      </Center>

      <Center color="gray" mt={4}>
        소셜 계정으로 간편 로그인
      </Center>
      <SocialLoginButtons />
    </>
  );
};

export default Signin;
