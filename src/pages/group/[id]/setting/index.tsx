import { useFetch } from "@/apis";
import { EditCustomTable } from "@/components";
import { ApiRoutes } from "@/constants";
import { CategoryBox, ImageBox } from "@/containers";
import { Group } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
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
interface GroupMeta {
  key: string;
  default: string | number;
  fieldName: keyof Group;
  input?: JSX.Element;
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
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);

  const { data: group, isSuccess } = useFetch<Group>(
    toUrl(ApiRoutes.Group, {
      id: numberingQuery,
    })
  );

  const { register, handleSubmit, setValue } = useForm<Group>({
    defaultValues: group,
  });

  const onSubmit = (data: Group) => {
    const form = { ...group, ...data };
    console.log(form);
  };

  const onChangeSex = useCallback(
    (value: string) => {
      setValue("sex", value === "1" ? true : false);
    },

    [setValue]
  );

  const groupMeta: GroupMeta[] | undefined = useMemo(() => {
    if (!isSuccess) return;
    setCategories(group.categories);
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
        key: "최소 연령",
        default: group?.minimum_age,
        fieldName: "minimum_age",
      },
      {
        key: "최대 연령",
        fieldName: "maximum_age",
        default: group?.maximum_age,
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
  }, [group, isSuccess, onChangeSex]);

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
              })}

              <Tr>
                <Th width={"15%"} fontSize={16} verticalAlign={"top"} pt={8}>
                  Images
                </Th>
                <Td>
                  <ImageBox imgData={img} setImgData={setImg} />
                </Td>
              </Tr>
              <Tr>
                <Th width={"15%"} fontSize={16} verticalAlign={"top"} pt={8}>
                  Category
                </Th>
                <Td>
                  <CategoryBox categories={categories} />
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
