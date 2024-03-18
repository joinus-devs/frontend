import { Button } from "@chakra-ui/react";

function GenderSelection({
  value,
  onChange,
  isSelected,
}: {
  value: string;
  onChange: (value: string) => void;
  isSelected: boolean;
}) {
  return (
    <Button
      onClick={() => onChange(value)}
      borderWidth="1px"
      borderRadius={"md"}
      variant={"outline"}
      color={isSelected ? "green.500" : "gray.600"}
      bg={"white"}
      borderColor={isSelected ? "green.500" : "gray.100"}
      _hover={{ bg: "white" }}
      px={16}
      py={1}
    >
      {value}
    </Button>
  );
}

export default GenderSelection;
