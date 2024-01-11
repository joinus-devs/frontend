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
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface SetGroupOptionsProps {
  getValues: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

const SetGroupOptions = ({ getValues, setValue }: SetGroupOptionsProps) => {
  const [fromValues, setFromValues] = useState<FormValues>(initialFormValues);

  const renderFormValues = useCallback(() => {
    setFromValues(getValues());
  }, [getValues]);

  const setMaxMember = useCallback(
    (value: number) => {
      setValue("maxParticipants", value);
      renderFormValues();
    },
    [renderFormValues, setValue]
  );

  return (
    <>
      <Flex direction={"column"} gap={12} mt={12}>
        <FormControl>
          <FormLabel htmlFor="group_option_age" fontWeight={"normal"}>
            Age
          </FormLabel>
          <RangeSlider
            defaultValue={[0, 100]}
            onChange={(value) => {
              setValue("minAge", value[0]);
              setValue("maxAge", value[1]);
              renderFormValues();
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <FormHelperText>
            연령 : {fromValues?.minAge}~{fromValues?.maxAge}세
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
                  variant={
                    fromValues?.maxParticipants === value ? "solid" : "outline"
                  }
                  w={20}
                  h={16}
                >
                  {value}
                </Button>
              );
            })}
          </Flex>
          <FormHelperText>
            최대인원 : {fromValues?.maxParticipants}명
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

export default SetGroupOptions;
