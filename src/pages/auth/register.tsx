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
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

interface UserData {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  birthday: string;
  phone: string;
  gender: string;
}

const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues,
    setValue,
    watch,
    control,
  } = useForm<UserData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      birthday: "",
      username: "",
      password: "",
      passwordCheck: "",
      phone: "",
      gender: "",
    },
  });

  const genderOptions = ["남자", "여자"];
  const selectedGender = watch("gender");

  const { getRootProps } = useRadioGroup({
    name: "sex",
    defaultValue: "남자",
    onChange: (value: string) => setValue("gender", value),
  });
  const group = getRootProps();

  const onSubmit = async (values: UserData) => {
    const isMale = values.gender === "남자";

    if (values.password !== values.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );

      return;
    }

    // signup/social
    if (router.query.socialId && router.query.type) {
      const res = await fetch("http://44.204.44.65/auth/signup/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          social_id: router.query.socialId,
          type: router.query.type,
          name: values?.username,
          sex: isMale,
          phone: values?.phone,
          email: values?.email,
        }),
      }).then((response) => console.log("response :", response));
      // signup
    } else {
      const res = await fetch("http://44.204.44.65/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values?.email,
          password: values?.password,
          name: values?.username,
          // birthday: values?.birthday,
          phone: values?.phone,
          sex: isMale,
        }),
      }).then((response) => console.log("response :", response));
    }
  };

  return (
    <>
      <Center mt={70} h="100px" color="#25D366" fontSize={"3rem"}>
        <Text _hover={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          JoinUs
        </Text>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box maxW="sm" mx="auto" mt={2} p={6} borderWidth={1} borderRadius="md">
          <FormControl isInvalid={!!errors.email}>
            <Input
              type="email"
              placeholder="이메일"
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

          <FormControl mt={4} isInvalid={!!errors.passwordCheck}>
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
              placeholder="생년월일 6자리"
              {...register("birthday", {
                required: "생년월일을 입력해주세요",
                minLength: {
                  value: 6,
                  message: "생년월일 6자리를 입력해 주세요",
                },
                maxLength: {
                  value: 6,
                  message: "생년월일 6자리를 입력해 주세요",
                },
              })}
            />
            <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.phone}>
            <Input
              type="text"
              placeholder="전화번호"
              {...register("phone", {
                required: "전화번호를 입력해주세요",
                minLength: {
                  value: 11,
                  message: "올바른 전화번호를 입력해주세요",
                },
                maxLength: {
                  value: 11,
                  message: "올바른 전화번호를 입력해주세요",
                },
              })}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.gender}>
            <HStack {...group} justify="space-between" mt={4}>
              {genderOptions.map((value) => {
                return (
                  <Controller
                    key={value}
                    name="gender"
                    control={control}
                    rules={{ required: "성별을 선택해주세요" }}
                    render={({ field }) => (
                      <GenderSelection
                        value={value}
                        onChange={field.onChange}
                        isSelected={selectedGender === value}
                      ></GenderSelection>
                    )}
                  />
                );
              })}
            </HStack>
          </FormControl>
          <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
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
