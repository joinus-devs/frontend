import { PopoverItem } from "@/components";
import { ApiRoutes, navs, supportNavs } from "@/constants";
import { Flex, Heading, Box } from "@chakra-ui/react";
import router from "next/router";
import { LoginIconBox } from "@/containers";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box width={"1280px"} margin={"0 auto"} pt={"1.125rem"} pb={"1.125rem"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        pt={4 - 5}
        pb={4 - 5}
        pl={8}
      >
        <Flex gap={10}>
          <Box
            onClick={() => router.push(`/${ApiRoutes.Home}`)}
            as="button"
            fontSize={"lg"}
            fontWeight={"medium"}
            position={"relative"}
            width={"100px"}
            h={"40px"}
            mt={2}
          >
            <Image src="/logo.png" alt="logo" fill sizes="100%" />
          </Box>
          {navs.map((nav, i) => {
            return (
              nav.label !== "Support" && (
                <Box
                  key={`nav_${i}`}
                  onClick={() => router.push(nav.pathname)}
                  as="button"
                  fontSize={"lg"}
                  fontWeight={"medium"}
                >
                  {nav.label}
                </Box>
              )
            );
          })}
          <Box
            fontSize={"lg"}
            fontWeight={"medium"}
            as="button"
            onClick={() => router.push(`/${ApiRoutes.Support}`)}
          >
            <PopoverItem
              trigger="hover"
              head={"Support"}
              contentBoxStyle={{ width: 150, textAlign: "center" }}
            >
              <Flex p={4} gap={4} direction={"column"}>
                {supportNavs.map((nav, i) => {
                  return (
                    <Heading key={`supnav_${i}`} size={"sm"}>
                      {nav.label}
                    </Heading>
                  );
                })}
              </Flex>
            </PopoverItem>
          </Box>
        </Flex>
        <LoginIconBox />
      </Flex>
    </Box>
  );
};

export default Navbar;
