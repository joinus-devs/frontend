import { GenderSelection } from "@/components";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UserData {
  username: string;
  id: string;
  password: string;
  passwordCheck: string;
  birthday: string;
}

const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      birthday: "",
      id: "",
      password: "",
      passwordCheck: "",
    },
  });

  const genderOptions = ["남자", "여자"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "GenderSelection",
    defaultValue: "남자",
  });
  const group = getRootProps();

  const onSubmit = (values: UserData) => {
    // router.push("/");
    console.log(values);
  };

  return (
    <>
      <Center bg="white" mt={70} h="100px" color="#25D366" fontSize={"3rem"}>
        <p>JoinUs</p>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW="sm" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
          <FormControl isInvalid={!!errors.id}>
            <Input
              type="text"
              placeholder="아이디"
              {...register("id", {
                required: "아이디를 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.id?.message}</FormErrorMessage>
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

          <FormControl mt={4} isInvalid={!!errors.password}>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordCheck", {
                required: "비밀번호가 일치하지 않습니다.",
              })}
            />
            <FormErrorMessage>{errors.passwordCheck?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box maxW="sm" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
          <FormControl isInvalid={!!errors.username}>
            <Input
              type="text"
              placeholder="이름"
              {...register("username", {
                required: "이름을 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.birthday}>
            <Input
              type="text"
              placeholder="생년월일 8자리"
              {...register("birthday", {
                required: "생년월일을 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
          </FormControl>
          <HStack {...group} justify="space-between" mt={4}>
            {genderOptions.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <GenderSelection key={value} {...radio}>
                  {value}
                </GenderSelection>
              );
            })}
          </HStack>
        </Box>
        <Center>
          <Button
            mt={6}
            mx="auto"
            colorScheme="primary"
            type="submit"
            width="sm"
            _hover={{ bg: "green.500" }}
          >
            회원가입
          </Button>
        </Center>
      </form>
    </>
  );
};

export default Register;
