import { useModalStore } from "@/stores";
import {
  Box,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { RiListSettingsLine } from "react-icons/ri";

export const ModifyIcon = () => {
  const { openConfirm } = useModalStore(["openConfirm"]);
  return (
    <>
      <Popover trigger={"click"} placement="left">
        <PopoverTrigger>
          <Box as="button" top={4} right={4} position={"absolute"}>
            <Icon as={RiListSettingsLine} fontSize={20} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width={20} alignItems={"center"} mt={12}>
          <Text padding={2} as={"button"}>
            수정
          </Text>
          <Text
            padding={2}
            as={"button"}
            onClick={() =>
              openConfirm({
                title: "Delete Post",
                content: "해당피드를 삭제하시겠습니까?",
                onConfirm: () => {
                  //해당피드 삭제 api
                },
              })
            }
          >
            삭제
          </Text>
        </PopoverContent>
      </Popover>
    </>
  );
};
