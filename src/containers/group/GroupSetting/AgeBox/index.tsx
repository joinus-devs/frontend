import { Group } from "@/types";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormHelperText,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface AgeBoxProps {
  group: Group;
  setValue: UseFormSetValue<Group>;
  watch: UseFormWatch<Group>;
}

const AgeBox = ({ group, setValue, watch }: AgeBoxProps) => {
  const handleChangeSlider = useCallback(
    (value: number[]) => {
      setValue("minimum_age", value[0]);
      setValue("maximum_age", value[1]);
    },
    [setValue]
  );
  const options = watch(["minimum_age", "maximum_age"]);
  return (
    <Tr>
      <Th fontSize={16}>연령 제한</Th>
      <Td>
        <FormControl pr={8}>
          <RangeSlider
            defaultValue={[group.minimum_age, group.maximum_age]}
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
      </Td>
    </Tr>
  );
};
export default AgeBox;
