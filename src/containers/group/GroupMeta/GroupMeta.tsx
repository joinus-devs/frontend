import { EditCustomTable } from "@/components";
import { Group } from "@/types";
import {
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { UseFormRegister } from "react-hook-form";

interface GroupMetaObjectProps {
  key: string;
  default: string | number;
  fieldName: keyof Group;
  input?: JSX.Element;
}

interface GroupMetaProps {
  group?: Group;
  onChangeSex: (value: string) => void;
  register: UseFormRegister<Group>;
}
const KEYNAME = ["그룹명", "그룹 설명", "최대 인원", "그룹 성별"];

const GroupMeta = ({ group, onChangeSex, register }: GroupMetaProps) => {
  const groupMeta: GroupMetaObjectProps[] | undefined = useMemo(() => {
    if (!group) return;
    return [
      {
        key: "그룹명",
        default: group?.name,
        fieldName: "name",
      },

      {
        key: "그룹 설명",
        default: group?.description,
        fieldName: "description",
      },
      {
        key: "최대 인원",
        default: group?.capacity,
        fieldName: "capacity",
      },
      {
        key: "그룹 성별",
        default: "",
        fieldName: "sex",
        input: (
          <RadioGroup
            defaultValue={group?.sex === true ? "1" : "2"}
            onChange={(e) => onChangeSex(e)}
          >
            <Stack spacing={5} direction="row">
              <Radio value="1">남성만</Radio>
              <Radio value="2">여성만</Radio>
            </Stack>
          </RadioGroup>
        ),
      },
    ];
  }, [group, onChangeSex]);
  return (
    <>
      {groupMeta?.map((meta, index) => {
        if (meta.key === "그룹 성별") {
          return (
            <Tr key={index}>
              <Th width={"15%"} fontSize={16}>
                {meta.key}
              </Th>
              <Td>{meta.input}</Td>
            </Tr>
          );
        } else {
          return (
            <Tr key={index}>
              <Th width={"15%"} fontSize={16}>
                {meta.key}
              </Th>
              <Td position={"relative"}>
                <EditCustomTable
                  defaultValue={meta.default}
                  fieldName={meta.fieldName}
                  register={register}
                />
              </Td>
            </Tr>
          );
        }
      }) ?? (
        <>
          {KEYNAME.map((key, index) => {
            return (
              <Tr key={`tr_${index}`}>
                <Th width={"15%"} fontSize={16}>
                  {key}
                </Th>
                <Td>
                  <Skeleton height="20px" />
                </Td>
              </Tr>
            );
          })}
        </>
      )}
    </>
  );
};
export default GroupMeta;
