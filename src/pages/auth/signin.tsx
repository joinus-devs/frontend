import { SocialLoginButtons } from "@/containers";
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
// import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface UserData {
  email: string;
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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: UserData) => {
    // alert("환영합니다!");
    const email = values.email;
    const password = values.password;

    console.log(values);
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
              type="email"
              placeholder="아이디"
              {...register("email", {
                required: "아이디를 입력해주세요",
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

      {/* <Center mt={4}>
        <HStack> */}
      <SocialLoginButtons />
      {/* </HStack>
      </Center> */}
    </>
  );
};

export default Signin;
