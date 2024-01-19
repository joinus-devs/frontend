import {
  Popover,
  PopoverTrigger,
  Flex,
  Icon,
  PopoverContent,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface PopoverItemProps {
  head: string;
  children?: React.ReactNode;
  contentBoxStyle?: React.CSSProperties;
}

const PopoverItem = ({ head, children, contentBoxStyle }: PopoverItemProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Popover
      trigger={"hover"}
      onOpen={() => setIsFocus(true)}
      onClose={() => setIsFocus(false)}
    >
      <PopoverTrigger>
        <Flex gap={2} alignItems={"center"}>
          <Text>{head}</Text>
          <Icon
            as={IoIosArrowDown}
            transform={isFocus ? "rotate(180deg)" : "rotate(0deg)"}
            transition={"transform 0.2s ease-in-out"}
            mt={1}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent mt={"1rem"} style={contentBoxStyle}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverItem;
