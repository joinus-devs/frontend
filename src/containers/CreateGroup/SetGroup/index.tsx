import { groupCategory } from "@/constants";
import { Group } from "@/types/group";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useCallback } from "react";

export interface SetGroupProps {
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
  group: Group;
}

const SetGroup = ({ setGroup, group }: SetGroupProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<any>) => {
      const { name, value } = e.target;
      setGroup({ ...group, [name]: value });
    },
    [group, setGroup]
  );

  return (
    <>
      <FormControl mt={8}>
        <FormLabel htmlFor="group_name" fontWeight={"normal"}>
          Group Name
        </FormLabel>
        <Input
          id="group_name"
          name="name"
          onChange={(e) => handleInputChange(e)}
          placeholder="그룹명을 입력해주세요."
          maxLength={10}
        />
        <FormHelperText>그룹명의 최대길이는 10자리입니다.</FormHelperText>
      </FormControl>

      <FormControl mt={8}>
        <FormLabel htmlFor="group_category" fontWeight={"normal"}>
          Group Category
        </FormLabel>
        <Select
          h={12}
          defaultValue={""}
          name="category"
          onChange={(e) => handleInputChange(e)}
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
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="group_description" fontWeight={"normal"} mt={8}>
          Group Introduce
        </FormLabel>
        <Textarea
          placeholder="그룹소개를 해주세요."
          minH={150}
          name="description"
          onChange={(e) => handleInputChange(e)}
        />
      </FormControl>
    </>
  );
};

export default SetGroup;
