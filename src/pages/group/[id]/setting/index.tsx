import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { GroupSetting } from "@/containers";
import UploadImg from "@/containers/group/GroupSetting/UploadImg/indetx";
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
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface ImgSettingProps {
  type: string;
  url: string;
}

const dummyImg = [
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    type: "main",
    url: "https://cdn.pixabay.com/photo/2024/02/05/10/48/bird-8554205_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
  {
    type: "sub",
    url: "https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_1280.jpg",
  },
];

const Setting = () => {
  const [img, setImg] = useState<ImgSettingProps[]>(dummyImg);
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
  console.log(img);
  return (
    <Flex justify={"center"}>
      <Flex
        w={{ base: "100%", xl: "768px" }}
        direction={"column"}
        mt={"100px"}
        mb={"100px"}
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        gap={4}
      >
        <TableContainer>
          <Table variant="unstyled">
            <Tbody>
              {groupMeta?.map((meta, index) => {
                return (
                  <Tr key={index}>
                    <Th width={"15%"} fontSize={16}>
                      {meta.key}
                    </Th>
                    <Td>{meta.input}</Td>
                  </Tr>
                );
              })}
              <Tr>
                <Th width={"15%"} fontSize={16} verticalAlign={"top"} pt={8}>
                  Images
                </Th>
                <Td>
                  <Flex
                    direction={"column"}
                    gap={8}
                    boxShadow={"lg"}
                    maxH={"800px"}
                    overflowY={"auto"}
                  >
                    <UploadImg />
                    <GroupSetting imgData={img} setImgData={setImg} />
                  </Flex>
                </Td>
              </Tr>
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
