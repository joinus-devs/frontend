import { PostComment } from "@/containers/group/GroupFeedItem";
import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { MutableRefObject, Ref, useCallback } from "react";
import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputWithButtonProps {
  placeholder: string;
  icon: IconType;
  hanldeSubmit: () => void;
  boxStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  ref?: MutableRefObject<HTMLInputElement | null>;
}

const InputWithButton = ({
  placeholder,
  icon,
  hanldeSubmit,
  boxStyle,
  inputStyle,
  buttonStyle,
  iconStyle,
}: InputWithButtonProps) => {
  const wrapSubmit = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault();
      hanldeSubmit();
    },
    [hanldeSubmit]
  );

  return (
    <Flex as={"form"} style={boxStyle} onSubmit={wrapSubmit}>
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
        <Icon as={icon} style={iconStyle} />
      </Button>
    </Flex>
  );
};

export default InputWithButton;
