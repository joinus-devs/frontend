import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Group } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import {
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

const Setting = () => {
  const { register, handleSubmit, setValue } = useForm<Group>();
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);

  const { data: group, isSuccess } = useFetch<Group>(
    toUrl(ApiRoutes.Group, {
      id: numberingQuery,
    })
  );

  const onSubmit = (data: Group) => {
    console.log(data);
  };

  const onChangeSex = useCallback(
    (value: string) => {
      setValue("sex", value === "1" ? true : false);
    },
    [setValue]
  );

  const groupMeta = useMemo(() => {
    if (!isSuccess) return;
    console.log(group);
    return [
      {
        key: "그룹명",
        input: <Input defaultValue={group?.name} {...register("name")} />,
      },

      {
        key: "그룹 설명",
        input: (
          <Textarea
            defaultValue={group?.description}
            {...register("description")}
          />
        ),
      },
      {
        key: "최대 인원",
        input: (
          <Input
            defaultValue={group?.capacity}
            width={"20%"}
            {...register("capacity")}
          />
        ),
      },
      {
        key: "최소 연령",
        input: (
          <Input
            defaultValue={group?.minimum_age}
            width={"20%"}
            {...register("minimum_age")}
          />
        ),
      },
      {
        key: "최대 연령",
        input: (
          <Input
            defaultValue={group?.maximum_age}
            width={"20%"}
            {...register("maximum_age")}
          />
        ),
      },
      {
        key: "그룹 성별",
        input: (
          <RadioGroup
            defaultValue={group?.sex === true ? "1" : "2"}
            onChange={(e) => onChangeSex(e)}
          >
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="1">
                남성만
              </Radio>
              <Radio colorScheme="red" value="2">
                여성만
              </Radio>
            </Stack>
          </RadioGroup>
        ),
      },
    ];
  }, [group, isSuccess, onChangeSex, register]);

  return (
    <Flex justify={"center"}>
      <Flex
        w={{ base: "100%", xl: "960px" }}
        direction={"column"}
        mt={"100px"}
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TableContainer>
          <Table variant="unstyled">
            <Tbody>
              {groupMeta?.map((meta, index) => {
                return (
                  <Tr key={index}>
                    <Th width={"20%"} fontSize={16}>
                      {meta.key}
                    </Th>
                    <Td>{meta.input}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex gap={2} justifyContent={"end"} mr={"24px"}>
          <Button>돌아가기</Button>
          <Button type="submit">수정완료</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Setting;
