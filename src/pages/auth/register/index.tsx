import {
  UserData,
  checkEmailExists,
  selectGender,
  signIn,
  signUp,
  toFormatBirth,
} from "@/apis/auth";
import { DefaultLayout, GenderSelection } from "@/components";
import { PageRoutes } from "@/constants";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

interface UserDataForm {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  birth: string;
  phone: string;
  sex: string;
}

const Register = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setValue,
    watch,
    control,
  } = useForm<UserDataForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      birth: "",
      name: "",
      password: "",
      passwordCheck: "",
      phone: "",
      sex: "",
    },
  });

  const genderOptions = ["남자", "여자"];
  const selectedGender = watch("sex");

  const { getRootProps } = useRadioGroup({
    name: "sex",
    defaultValue: "남자",
    onChange: (value: string) => setValue("sex", value),
  });
  const group = getRootProps();

  const { mutate: handleSignUp } = useMutation({
    mutationFn: (userData: UserData) => signUp(userData),
    onSuccess: (data, variables: UserData) => {
      window.alert("회원가입에 성공하였습니다!");
      signIn(variables.email, variables.password!);
    },
  });

  const onSubmit = async (values: UserDataForm) => {
    const sex = selectGender(values.sex);
    const birth = toFormatBirth(values.birth);
    const profileURL = "/noneUserImg.webp";

    const data = {
      email: values?.email,
      password: values?.password,
      name: values?.name,
      birth: birth,
      phone: values?.phone,
      sex: sex,
      profile: process.env.NEXT_PUBLIC_CLIENT_DOMAIN + profileURL,
    };

    handleSignUp(data);
  };

  // 아이디 중복 체크
  const checkDuplicateId = async (value: string) => {
    const response = await checkEmailExists(value);

    if (response.status === 400) {
      return setError("email", {
        type: "string",
        message: "올바른 이메일을 입력해주세요.",
      });
    }

    if (response.status === 409) {
      return setError("email", {
        type: "string",
        message: "중복된 이메일입니다.",
      });
    }

    return clearErrors();
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
          p={2}
          gap={2}
          w={{ base: "100%", sm: "480px" }}
        >
          <FormControl isInvalid={!!errors.email}>
            <Input
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "아이디를 입력해주세요",
                onBlur: (e) => checkDuplicateId(e.target.value),
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <Input
              type="password"
              placeholder="비밀번호 8자리 이상"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상입니다.",
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.passwordCheck}>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordCheck", {
                required: "비밀번호가 일치하지 않습니다.",
                validate: {
                  check: (value) => {
                    if (getValues("password") !== value) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
            <FormErrorMessage>{errors.passwordCheck?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.name}>
            <Input
              type="text"
              placeholder="이름"
              {...register("name", {
                required: "이름을 입력해주세요",
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.birth}>
            <Input
              type="text"
              placeholder="생년월일 8자리 (YYYYMMDD)"
              {...register("birth", {
                required: "생년월일 8자리를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "생년월일 8자리를 입력해 주세요",
                },
                maxLength: {
                  value: 8,
                  message: "생년월일 8자리를 입력해 주세요",
                },
              })}
            />
            <FormErrorMessage>{errors.birth?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
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

          <FormControl isInvalid={!!errors.sex}>
            <Flex {...group} gap={2}>
              {genderOptions.map((value) => {
                return (
                  <Controller
                    key={value}
                    name="sex"
                    control={control}
                    rules={{ required: "성별을 선택해주세요" }}
                    render={({ field }) => (
                      <GenderSelection
                        value={value}
                        onChange={field.onChange}
                        isSelected={selectedGender === value}
                      />
                    )}
                  />
                );
              })}
            </Flex>
            <FormErrorMessage>{errors.sex?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit">회원가입</Button>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default Register;
