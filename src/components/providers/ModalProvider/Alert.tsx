import { modalStore } from "@/stores/modal";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const Alert = () => {
  const { alert, closeAlert } = modalStore();

  return (
    <Modal isOpen={!!alert} onClose={closeAlert}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{alert?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{alert?.content}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeAlert}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
