import { SetGroupProps } from "@/types/group";
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";

const SetGroupOptions = ({ setGroup, group }: SetGroupProps) => {
  console.log("in setGroupOptions");
  return (
    <FormControl mb="4%" mt="4%">
      <Flex direction={"column"} gap={12}>
        <Box>
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
        </Box>
        <Box>
          <FormLabel htmlFor="group_option_age" fontWeight={"normal"}>
            Max Member
          </FormLabel>
          <FormHelperText>최대인원 : {group.maxParticipants}명</FormHelperText>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default SetGroupOptions;
