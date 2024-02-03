import { CircleImg } from "@/components";
import { User } from "@/types";
import { Grid, GridItem, Flex, Text, Heading } from "@chakra-ui/react";

interface TemplateProps {
  groupMember?: User[];
  header: string;
}

export const Template = ({ groupMember, header }: TemplateProps) => {
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
        {groupMember?.map((v, index) => (
          <GridItem key={`${header}_${index}`}>
            <Flex
              direction={"column"}
              w={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={4}
            >
              <CircleImg imgSrc={"/noneUserImg.webp"} alt="userImg" size={24} />
              <Text>{v.name}</Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};
