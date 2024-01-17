import { CircleImg } from "@/components";
import { Grid, GridItem, Flex, Text, Heading } from "@chakra-ui/react";

interface TemplateProps {
  dummyGroupMember: {
    id: number;
    name: string;
    imgSrc: string;
  }[];
  header: string;
}

export const Template = ({ dummyGroupMember, header }: TemplateProps) => {
  return (
    <Flex direction={"column"} gap={8}>
      <Grid templateColumns={"repeat(4,1fr)"}>
        <GridItem>
          <Heading fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
            {header}
          </Heading>
        </GridItem>
      </Grid>
      <Grid pb={8} templateColumns={"repeat(4,1fr)"} rowGap={12}>
        {dummyGroupMember.map((v) => (
          <GridItem key={v.id}>
            <Flex
              direction={"column"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              <CircleImg imgSrc={v.imgSrc} alt="userImg" size={24} />
              <Text>{v.name}</Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};
