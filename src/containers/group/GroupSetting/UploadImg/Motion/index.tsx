import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

interface PreviewImageProps {
  variants: {
    rest: {
      rotate?: string;
      scale: number;
      x?: string;
      filter: string;
      transition: {
        duration: number;
        type: string;
        ease: string;
      };
    };
    hover: {
      x?: string;
      scale: number;
      rotate?: string;
      filter: string;
      transition: {
        duration: number;
        type: string;
        ease: string;
      };
    };
  };
  backgroundImage: string;
}

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = (props: PreviewImageProps) => {
  return (
    <Box
      bg="gray"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      as={motion.div}
      borderColor="gray.400"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
    />
  );
};

interface MotionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Motion = ({ onChange }: MotionProps) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  return (
    <Box
      borderColor="gray.300"
      borderStyle="dashed"
      borderWidth="4px"
      rounded="md"
      shadow="sm"
      role="group"
      transition="all 500ms ease-in-out"
      _hover={{
        shadow: "lg",
      }}
      as={motion.div}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <Box position="relative" height="100%" width="100%">
        <Box
          position="absolute"
          top="4"
          left="0"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
        >
          <Stack
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justify="center"
            spacing="4"
          >
            <Box height="20" width="16" position="relative">
              <PreviewImage
                variants={first}
                backgroundImage="url('https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg')"
              />
              <PreviewImage
                variants={second}
                backgroundImage="url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2628&q=80')"
              />
              <PreviewImage
                variants={third}
                backgroundImage={`url("https://images.unsplash.com/photo-1563612116625-3012372fccce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2480&q=80")`}
              />
            </Box>
            <Stack p="8" textAlign="center" spacing="1">
              <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                Click to upload
              </Heading>
              <Text fontWeight={"semibold"}>이미지 업로드</Text>
            </Stack>
          </Stack>
        </Box>
        <Input
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept="image/*"
          onDragEnter={startAnimation}
          onDragLeave={stopAnimation}
          onChange={onChange}
        />
      </Box>
    </Box>
  );
};

export default Motion;
