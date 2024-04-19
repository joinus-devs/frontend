import {
  useEditableControls,
  ButtonGroup,
  Button,
  Icon,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" pl={2}>
      <IconButton
        icon={<FaCheck />}
        aria-label="submit-bt"
        {...getSubmitButtonProps()}
      />
      <IconButton
        icon={<IoClose />}
        aria-label="cancel-bt"
        {...getCancelButtonProps()}
        fontWeight={"bold"}
        fontSize={20}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      icon={<LuClipboardEdit />}
      aria-label="edit-bt"
      position={"absolute"}
      right={0}
      _hover={{
        transform: "scale(1.2)",
        transition: "all 0.5s ease",
      }}
      {...getEditButtonProps()}
    />
  );
};

export default EditableControls;
