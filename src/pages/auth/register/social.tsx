import {
  checkEmailExists,
  selectGender,
  signInSocial,
  signUpSocial,
  toFormatBirth,
} from "@/apis/auth";
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
  Icon,
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
  file_: FileList;
}

const RegisterSocial = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
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

  const onSubmit = async (values: UserData) => {
    const gender = selectGender(values.gender);
    const birthday = toFormatBirth(values.birthday);

    if (values.password !== values.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );

      return;
    }

    const data = {
      social_id: router.query.socialId as string,
      type: router.query.type as string,
      email: values?.email,
      name: values?.username,
      birth: birthday,
      phone: values?.phone,
      sex: gender,
    };

    const response = await signUpSocial(data);

    if (response.status === 200) {
      window.alert("회원가입에 성공하였습니다!");
      signInSocial(data.social_id, data.type);
    }
  };

  // imageUpload
  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
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
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "아이디를 입력해주세요",
                onBlur: (e) => checkDuplicateId(e.target.value),
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={!!errors.username}>
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
              placeholder="생년월일 8자리 (YYYYMMDD)"
              {...register("birthday", {
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

export default RegisterSocial;
