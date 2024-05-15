import { ExclusiveAccessAlert } from "@/components/common";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

interface RequiredLoginModalProps {
  onClose: () => void;
}

const RequiredLoginModal = ({ onClose }: RequiredLoginModalProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ExclusiveAccessAlert text="로그인이 필요한 서비스입니다." />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant={"ghost"}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequiredLoginModal;
