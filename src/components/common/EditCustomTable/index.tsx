import { Group } from "@/types";
import {
  Button,
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
      <ButtonGroup justifyContent="center" size={"sm"} pl={2}>
        <Button fontSize={16} w={10} h={10}>
          <Icon as={FaCheck} {...getSubmitButtonProps()} />
        </Button>
        <Button fontSize={20} w={10} h={10}>
          <Icon as={IoClose} {...getCancelButtonProps()} fontWeight={"bold"} />
        </Button>
      </ButtonGroup>
    ) : (
      <Flex
        fontSize={20}
        w={10}
        h={10}
        position={"absolute"}
        right={0}
        as={"button"}
        _hover={{
          transform: "scale(1.2)",
          transition: "all 0.5s ease",
        }}
      >
        <Icon size="sm" as={LuClipboardEdit} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={String(defaultValue)}
      isPreviewFocusable={false}
      as={Flex}
      direction={"row"}
      gap={2}
    >
      <EditablePreview fontStyle={"italic"} />
      <EditableInput {...register(fieldName)} />
      <EditableControls />
    </Editable>
  );
};

export default EditCustomTable;
