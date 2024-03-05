import { Group } from "@/types";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  useEditableControls,
} from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";

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
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size={"sm"}>
        <Flex
          fontSize={16}
          w={10}
          h={10}
          justifyContent={"center"}
          alignItems={"center"}
          as={"button"}
        >
          <Icon as={FaCheck} {...getSubmitButtonProps()} />
        </Flex>

        <Flex
          fontSize={20}
          w={10}
          h={10}
          justifyContent={"center"}
          alignItems={"center"}
          as={"button"}
        >
          <Icon as={IoClose} {...getCancelButtonProps()} />
        </Flex>
      </ButtonGroup>
    ) : (
      <Flex
        fontSize={20}
        w={10}
        h={10}
        position={"absolute"}
        right={0}
        as={"button"}
      >
        <Icon size="sm" as={LuClipboardEdit} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={String(defaultValue)}
      fontSize="2xl"
      isPreviewFocusable={false}
      as={Flex}
      direction={"row"}
      gap={2}
    >
      <EditablePreview />
      <EditableInput {...register(fieldName)} />
      <EditableControls />
    </Editable>
  );
};

export default EditCustomTable;
