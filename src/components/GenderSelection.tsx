import { Box, useRadio } from "@chakra-ui/react";

function GenderSelection(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "white",
          color: "green.500",
          borderColor: "green.500",
        }}
        _focus={{
          boxShadow: "ghost",
        }}
        px={16}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default GenderSelection;
