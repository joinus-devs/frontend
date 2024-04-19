import { getDomain } from "@/apis";
import { signIn } from "@/apis/auth";
import { ApiRoutes } from "@/constants";
import { SocialLoginButtons } from "@/containers";
import { toUrl } from "@/utils";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface UserData {
  email: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: handleSignIn, data } = useMutation({
    mutationFn: ({ email, password }: UserData) => signIn(email, password),
    onSuccess: (data) => {
      // localStorage.setItem("login-token", data.token);
      // router.push("/");
      queryClient.invalidateQueries({ queryKey: [toUrl(ApiRoutes.Me)] });
    },
  });

  const onSubmit = (values: UserData) => {
    handleSignIn(values);
  };

  return (
    <>
      <Center mt={70} h="100px" color="#25D366" fontSize={"3rem"}>
        <Text _hover={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          JoinUs
        </Text>
      </Center>
      <Box maxW="sm" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              type="text"
              placeholder="아이디"
              {...register("email", {
                required: "아이디를 입력해주세요",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
            onClick={() => router.push("/auth/register")}
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
