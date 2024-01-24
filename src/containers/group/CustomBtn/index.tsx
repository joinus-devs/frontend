import { Button, keyframes } from "@chakra-ui/react";

interface CustomBtnProps {
  style?: React.CSSProperties;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const btnAnimation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const CustomBtn = ({ style, onClick, text, type }: CustomBtnProps) => {
  return (
    <Button
      style={style}
      onClick={onClick}
      type={type}
      fontSize={24}
      p={8}
      animation={`${btnAnimation} 1s ease-in-out`}
      backgroundColor={"white"}
      color={"primary.500"}
      fontWeight={"bold"}
      _hover={{
        backgroundColor: "primary.600",
        color: "white",
      }}
    >
      {text}
    </Button>
  );
};

export default CustomBtn;
