import { groupMaxParticipants } from "@/constants";
import { FormValues, initialFormValues } from "@/pages/group/create";
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
import { useCallback, useState } from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface SetGroupOptionsProps {
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const SetGroupOptions = ({ setValue, watch }: SetGroupOptionsProps) => {
  const setMaxMember = useCallback(
    (value: number) => {
      setValue("maxParticipants", value);
    },
    [setValue]
  );

  const handleChangeSlider = useCallback(
    (value: number[]) => {
      setValue("minAge", value[0]);
      setValue("maxAge", value[1]);
    },
    [setValue]
  );

  const options = watch(["minAge", "maxAge", "maxParticipants"]);

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
          <Flex justifyContent={"space-between"}>
            {groupMaxParticipants.map((value, index) => {
              return (
                <Button
                  key={`btn_${index}`}
                  onClick={() => setMaxMember(value)}
                  variant={options[2] === value ? "solid" : "outline"}
                  w={20}
                  h={16}
                >
                  {value}
                </Button>
              );
            })}
          </Flex>
          <FormHelperText>최대인원 : {options[2]}명</FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

export default SetGroupOptions;
