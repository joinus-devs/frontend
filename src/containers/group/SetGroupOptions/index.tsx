import { groupAcceptSex, groupMaxParticipants } from "@/constants";
import { CreateGroupFormValues } from "@/pages/group/create";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface SetGroupOptionsProps {
  setValue: UseFormSetValue<CreateGroupFormValues>;
  watch: UseFormWatch<CreateGroupFormValues>;
}

const SetGroupOptions = ({ setValue, watch }: SetGroupOptionsProps) => {
  const setMaxMember = useCallback(
    (value: number) => {
      setValue("capacity", value);
    },
    [setValue]
  );

  const handleChangeSlider = useCallback(
    (value: number[]) => {
      setValue("minimum_age", value[0]);
      setValue("maximum_age", value[1]);
    },
    [setValue]
  );

  const setAcceptSex = useCallback(
    (value: boolean) => {
      setValue("sex", value);
    },
    [setValue]
  );

  const options = watch(["minimum_age", "maximum_age", "capacity", "sex"]);

  return (
    <>
      <Flex direction={"column"} gap={12} mt={12}>
        <FormControl>
          <FormLabel htmlFor="group_option_age" fontWeight={"normal"}>
            Age
          </FormLabel>
          <RangeSlider
            defaultValue={[0, 100]}
            onChange={(value) => handleChangeSlider(value)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <FormHelperText>
            연령 : {options[0]}~{options[1]}세
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="group_option_age" fontWeight={"normal"}>
            Max Member
          </FormLabel>
          <Flex gap={2}>
            {groupMaxParticipants.map((value, index) => {
              return (
                <Button
                  key={`btn_${index}`}
                  onClick={() => setMaxMember(value)}
                  variant={options[2] === value ? "solid" : "outline"}
                  w={20}
                  h={16}
                  flex={1}
                >
                  {value}
                </Button>
              );
            })}
          </Flex>
          <FormHelperText>최대인원 : {options[2]}명</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="group_option_age" fontWeight={"normal"}>
            Accept Sex
          </FormLabel>
          <Flex gap={2}>
            {groupAcceptSex.map((value, index) => {
              return (
                <Button
                  key={`btn_${index}`}
                  onClick={() => setAcceptSex(value === "남성" ? true : false)}
                  variant={
                    options[3] && value === "남성"
                      ? "solid"
                      : !options[3] && value === "여성"
                        ? "solid"
                        : "outline"
                  }
                  w={20}
                  h={16}
                  flex={1}
                >
                  {value}
                </Button>
              );
            })}
          </Flex>
          <FormHelperText>
            성별제한 : {options[3] ? "남성" : "여성"}만
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

export default SetGroupOptions;
