import { groupCategory } from "@/constants";
import { SetGroupProps } from "@/types/group";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

const SetGroup = ({ setGroup, group }: SetGroupProps) => {
  console.log("in setGroup");
  return (
    <>
      <FormControl mt={8}>
        <FormLabel htmlFor="group_name" fontWeight={"normal"}>
          Group Name
        </FormLabel>
        <Input
          id="group_name"
          onChange={(e) => {
            setGroup({ ...group, name: e.target.value });
          }}
        />
        <FormHelperText>그룹명을 입력해주세요.</FormHelperText>
      </FormControl>

      <FormControl mt={8}>
        <FormLabel htmlFor="group_category" fontWeight={"normal"}>
          Group Category
        </FormLabel>
        <Select
          h={12}
          defaultValue={""}
          onChange={(e) => {
            setGroup({ ...group, category: e.target.value });
          }}
        >
          <option value="" hidden>
            카테고리를 선택해주세요.
          </option>
          {groupCategory.map((v, i) => {
            return (
              <option key={`group_category${i}`} value={v}>
                {v}
              </option>
            );
          })}
        </Select>
        <FormHelperText>카테고리를 선택해주세요.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="group_description" fontWeight={"normal"} mt={8}>
          Group Introduce
        </FormLabel>
        <Textarea
          placeholder="그룹소개를 해주세요."
          minH={150}
          onChange={(e) => {
            setGroup({ ...group, description: e.target.value });
          }}
        />
        <FormHelperText>그룹을 소개해주세요.</FormHelperText>
      </FormControl>
    </>
  );
};

export default SetGroup;
