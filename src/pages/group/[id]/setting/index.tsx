import { useFetch, useUpateGroup } from "@/apis";
import { ApiRoutes } from "@/constants";
import {
  AgeBox,
  CategoryBox,
  GroupDetail,
  GroupMeta,
  ImageBox,
} from "@/containers";
import { Group } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Button, Flex, Table, TableContainer, Tbody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
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
  const [img, setImg] = useState<ImgSettingProps[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);

  const { mutate: updateGroup } = useUpateGroup(numberingQuery ?? 0);

  const { data: group, isSuccess } = useFetch<Group>(
    toUrl(ApiRoutes.Group, {
      id: numberingQuery,
    })
  );

  const { register, handleSubmit, setValue, watch } = useForm<Group>({
    defaultValues: group,
  });

  const onSubmit = (data: Group) => {
    const form = { ...group, ...data, categories: categories, images: img };
    updateGroup(form);
  };

  const onChangeSex = useCallback(
    (value: string) => {
      setValue("sex", value === "1" ? true : false);
    },

    [setValue]
  );

  useEffect(() => {
    if (!isSuccess || !group) return;
    setImg(group.images);
    setValue("minimum_age", group.minimum_age);
    setValue("maximum_age", group.maximum_age);
    setCategories(group.categories);
  }, [group, isSuccess, setValue]);

  return (
    <GroupDetail>
      <Flex justify={"center"}>
        <Flex
          w={{ base: "100%", xl: "768px" }}
          direction={"column"}
          mb={"100px"}
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                <GroupMeta
                  group={group}
                  onChangeSex={onChangeSex}
                  register={register}
                />
                <AgeBox group={group} setValue={setValue} watch={watch} />
                <ImageBox imgData={img} setImgData={setImg} />
                <CategoryBox
                  categories={categories}
                  setCategories={setCategories}
                />
              </Tbody>
            </Table>
          </TableContainer>
          <Flex gap={2} justifyContent={"end"} mr={"24px"}>
            <Button>돌아가기</Button>
            <Button type="submit">수정완료</Button>
          </Flex>
        </Flex>
      </Flex>
    </GroupDetail>
  );
};

export default Setting;
