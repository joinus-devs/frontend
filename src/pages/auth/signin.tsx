import { useSignin } from "@/apis";
import { DefaultLayout } from "@/components";
import { ApiRoutes, PageRoutes } from "@/constants";
import { SocialLoginButtons } from "@/containers";
import { toUrl } from "@/utils";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface UserData {
  email: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: signin } = useSignin();
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

  const onSubmit = async (values: UserData) => {
    const email = values.email;
    const password = values.password;
    signin(
      { email, password },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [ApiRoutes.Me] });
          const redirect = router.query.redirect;
          if (redirect) {
            router.push(redirect.toString());
          } else {
            router.push(toUrl(PageRoutes.Home));
          }
        },
      }
    );
  };

  return (
    <DefaultLayout>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        py={12}
      >
        <Heading
          size={"xl"}
          _hover={{ cursor: "pointer" }}
          onClick={() => router.push(PageRoutes.Home)}
        >
          Join Us
        </Heading>
        <Flex
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
          direction={"column"}
          gap={2}
          p={2}
          borderWidth={1}
          borderRadius="md"
          w={{ base: "100%", sm: "480px" }}
        >
          <FormControl isInvalid={!!errors.email}>
            <Input
              type="text"
              placeholder="아이디"
              _placeholder={{
                fontStyle: "italic",
              }}
              {...register("email", {
                required: "아이디를 입력해주세요",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
              py={6}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
              py={6}
              _placeholder={{
                fontStyle: "italic",
              }}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button py={6} fontSize={"20"} type="submit">
            로그인
          </Button>
        </Flex>
        <Flex gap={2}>
          <Button variant="ghost" onClick={() => console.log("아이디 찾기")}>
            아이디 찾기
          </Button>
          <Button variant="ghost" onClick={() => console.log("비밀번호 찾기")}>
            비밀번호 찾기
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push(PageRoutes.SignUp)}
          >
            회원가입
          </Button>
        </Flex>
        <SocialLoginButtons />
      </Flex>
    </DefaultLayout>
  );
};

export default Signin;
