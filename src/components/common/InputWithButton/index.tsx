import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface InputWithButtonProps {
  placeholder: string;
  icon: IconType;
  hanldeSubmit: () => void;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const InputWithButton = ({
  placeholder,
  icon,
  hanldeSubmit,
  boxStyle,
  inputStyle,
  buttonStyle,
}: InputWithButtonProps) => {
  return (
    <Flex as={"form"} style={boxStyle} onSubmit={hanldeSubmit}>
      <Input placeholder={placeholder} size="lg" h={16} style={inputStyle} />
      <Button
        type="submit"
        position={"absolute"}
        fontWeight={"bold"}
        m={2}
        w={12}
        h={12}
        zIndex={1}
        style={buttonStyle}
      >
        <Icon as={icon} />
      </Button>
    </Flex>
  );
};

export default InputWithButton;
