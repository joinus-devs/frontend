import { Group } from "@/types";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import EditableControls from "./EditableControls";

interface EditTableProps {
  defaultValue: string | number;
  fieldName: keyof Group;
  register: UseFormRegister<Group>;
}

const EditCustomTable = ({
  defaultValue,
  fieldName,
  register,
}: EditTableProps) => {
  return (
    <Editable
      textAlign="center"
      defaultValue={String(defaultValue)}
      isPreviewFocusable={false}
      as={Flex}
      direction={"row"}
      gap={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <EditablePreview fontStyle={"italic"} />
      <EditableInput {...register(fieldName)} />
      <EditableControls />
    </Editable>
  );
};

export default EditCustomTable;
