import { useFetch } from "@/apis";
import { ApiRoutes } from "@/constants";
import { Group } from "@/types";
import { QueryParser, toUrl } from "@/utils";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Setting = () => {
  const router = useRouter();
  const numberingQuery = QueryParser.toNumber(router.query.id);

  const { data: group } = useFetch<Group>(
    toUrl(ApiRoutes.Group, {
      id: numberingQuery,
    })
  );
  console.log(group);
  return (
    <Flex justify={"center"}>
      <Flex
        w={{ base: "100%", xl: "1280px" }}
        direction={"column"}
        mt={"100px"}
      >
        <Text>hi</Text>
      </Flex>
    </Flex>
  );
};

export default Setting;
