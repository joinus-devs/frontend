import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Center } from "@chakra-ui/react";

interface SigninFormValues {
  username: string;
  password: string;
}

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninFormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: SigninFormValues) => {
    alert("환영합니다!");
  };

  return (
    <>
      <Center bg="white" mt={70} h="100px" color="#25D366" fontSize={"3rem"}>
        <p>JoinUs</p>
      </Center>
      <Box maxW="md" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
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
            onClick={() => console.log("회원가입")}
          >
            회원가입
          </Button>
        </Stack>
      </Center>
    </>
  );
};

export default Signin;
