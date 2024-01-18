import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { IconBox } from "./IconBox";
import { CircleImg } from "@/components";
import { ImgBox } from "./ImgBox";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
}

const Drawer = ({ isOpen, onClose, btnRef }: DrawerProps) => {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bgColor={"blackAlpha.200"}>menu</DrawerHeader>
        <DrawerBody>
          <Flex
            position={"relative"}
            direction={"column"}
            gap={16}
            mt={2}
            mb={4}
          >
            <IconBox />
            <ImgBox />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};
export default Drawer;
