import { groupMaxParticipants } from "@/constants";
import { GroupOptions } from "@/types/group";

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

interface SetGroupOtipnsProps {
  setGroupOptions: React.Dispatch<React.SetStateAction<GroupOptions>>;
  groupOptions: GroupOptions;
}

const SetGroupOptions = ({
  setGroupOptions,
  groupOptions,
}: SetGroupOtipnsProps) => {
  const handleBtnClick = useCallback(
    (value: number) => {
      setGroupOptions({ ...groupOptions, maxParticipants: value });
    },
    [groupOptions, setGroupOptions]
  );

  const handleAgeLimitChange = useCallback(
    (e: number[]) => {
      const [minAge, maxAge] = e;
      setGroupOptions({ ...groupOptions, minAge, maxAge });
    },
    [groupOptions, setGroupOptions]
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
            onChange={(e) => handleAgeLimitChange(e)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <FormHelperText>
            연령 : {groupOptions.minAge}~{groupOptions.maxAge}세
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
                  onClick={() => handleBtnClick(value)}
                  variant={
                    groupOptions.maxParticipants === value ? "solid" : "outline"
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
            최대인원 : {groupOptions.maxParticipants}명
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

export default SetGroupOptions;
