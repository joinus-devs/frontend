import { useFetch } from "@/apis/hooks";
import { ApiRoutes } from "@/constants";
import { FormValues } from "@/pages/group/create";
import { Category } from "@/types/category";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface SetGroupDetailProps {
  register: UseFormRegister<FormValues>;
}

const SetGroup = ({ register }: SetGroupDetailProps) => {
  const { data } = useFetch<Category[]>(ApiRoutes.Category);

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="group_name" fontWeight={"normal"}>
          Group Name
        </FormLabel>
        <Input
          id="group_name"
          placeholder="그룹명을 입력해주세요."
          maxLength={10}
          {...register("name")}
        />
        <FormHelperText>그룹명의 최대길이는 10자리입니다.</FormHelperText>
      </FormControl>

      <FormControl mt={8}>
        <FormLabel htmlFor="group_category" fontWeight={"normal"}>
          Group Category
        </FormLabel>
        <Select h={12} {...register("category")}>
          <option value="" hidden>
            카테고리를 선택해주세요.
          </option>
          {data?.map((v, i) => {
            return (
              <option key={`group_category${i}`} value={v.id}>
                {v.name}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="group_description" fontWeight={"normal"} mt={8}>
          Group Introduce
        </FormLabel>
        <Textarea
          placeholder="그룹소개를 해주세요."
          minH={150}
          {...register("description")}
        />
      </FormControl>
    </>
  );
};

export default SetGroup;
