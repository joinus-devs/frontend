import { CircleImg } from "@/components";
import { PageRoutes, toCategory } from "@/constants";
import { GroupCardInfo } from "@/containers";
import { Group, GroupWithPage } from "@/types";
import { toUrl } from "@/utils";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface GroupProps {
  data: Group;
}

const none = "/none-groupimg.webp";

const GroupCard = ({ data }: GroupProps) => {
  const router = useRouter();
  const imgs = data.images;
  const maingImg = imgs.find((img) => img.type === "main")?.url ?? none;

  return (
    <Card
      onClick={() => router.push(toUrl(PageRoutes.GroupHome, { id: data.id }))}
      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
    >
      <CardHeader py={8}>
        <Flex gap={12}>
          <Heading size={"lg"}>{data.name}</Heading>
          <Flex justifyContent={"center"} gap={2}>
            {data.categories.map((category, index) => {
              return (
                <Tag
                  key={index}
                  variant={"solid"}
                  size={"lg"}
                  borderRadius={"full"}
                >
                  {toCategory[category]}
                </Tag>
              );
            })}
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <Flex gap={4}>
          <CircleImg imgSrc={maingImg} alt="group_img" size={48} />
          <Flex direction={"column"} flex={1} gap={4} px={8} boxShadow={"md"}>
            <Heading size={"sm"} textAlign={"center"}>
              {data.description}
            </Heading>

            <GroupCardInfo group={data} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default GroupCard;
