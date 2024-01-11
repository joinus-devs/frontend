import { groupMaxParticipants } from "@/constants";
import { SetGroupProps } from "../SetGroup";
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

const SetGroupOptions = ({ setGroup, group }: SetGroupProps) => {
  const handleBtnClick = useCallback(
    (value: number) => {
      setGroup({ ...group, maxParticipants: value });
    },
    [group, setGroup]
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
            onChange={(e: [number, number]) => setGroup({ ...group, Age: e })}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <FormHelperText>
            연령 : {group.Age[0]}~{group.Age[1]}세
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
                    group.maxParticipants === value ? "solid" : "outline"
                  }
                  w={20}
                  h={16}
                >
                  {value}
                </Button>
              );
            })}
          </Flex>
          <FormHelperText>최대인원 : {group.maxParticipants}명</FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};

export default SetGroupOptions;
