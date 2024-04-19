import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Heading size={"md"}>{"로그인이 필요한 서비스입니다."}</Heading>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequiredLoginModal;
