import { GroupBodyForm, GroupOptionForm } from "@/containers";
import { useBgColor } from "@/hooks";
import { CreateGroupFormValues } from "@/types";
import { Flex } from "@chakra-ui/react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface GroupFormProps {
  register: UseFormRegister<CreateGroupFormValues>;
  watch: UseFormWatch<CreateGroupFormValues>;
  setValue: UseFormSetValue<CreateGroupFormValues>;
}

const GroupForm = ({ register, watch, setValue }: GroupFormProps) => {
  const bgColor = useBgColor();

  return (
    <Flex
      boxShadow={"lg"}
      p={4}
      zIndex={1}
      background={bgColor}
      borderRadius={"2xl"}
      direction={"column"}
    >
      <GroupBodyForm register={register} />
      <GroupOptionForm setValue={setValue} watch={watch} />
    </Flex>
  );
};
export default GroupForm;
