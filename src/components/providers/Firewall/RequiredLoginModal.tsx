import {
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface RequiredLoginModalProps {
  onClose: () => void;
}

const RequiredLoginModal = ({ onClose }: RequiredLoginModalProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex direction={"column"} alignItems={"center"} gap={4} pt={4}>
            <Icon
              as={IoAlertCircleOutline}
              h={"16"}
              w={"16"}
              color={"yellow.500"}
            />
            <Heading size={"md"}>{"로그인이 필요한 서비스입니다"}</Heading>
          </Flex>
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
