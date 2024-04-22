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
      variant={isSelected ? "outline" : "ghost"}
      onClick={() => onChange(value)}
      borderWidth="1px"
      borderRadius={"md"}
      flex={1}
    >
      {value}
    </Button>
  );
}

export default GenderSelection;
