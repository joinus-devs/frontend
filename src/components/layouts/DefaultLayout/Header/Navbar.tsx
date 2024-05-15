import { ApiRoutes, navs } from "@/constants";
import { toUrl } from "@/utils";
import { Box, Flex, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import router from "next/router";
import { Login } from "./Login";

const Navbar = () => {
  return (
    <Box
      width={{ base: "100%", md: "container.md" }}
      margin={"0 auto"}
      py={"4"}
      px={"2"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        pt={4 - 5}
        pb={4 - 5}
      >
        <Flex gap={"4"}>
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
            <Image src="/logo.png" alt="logo" fill sizes="100%" priority />
          </Box>
          <Flex align={"center"} gap={"2"}>
            {navs.map((nav, i) => {
              return (
                <Tooltip label={nav.label} key={`nav_${i}`}>
                  <IconButton
                    variant={"ghost"}
                    aria-label={nav.label}
                    onClick={() => router.push(toUrl(nav.pathname))}
                    color={"subtleText"}
                  >
                    <Icon as={nav.icon} w={6} h={6} />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Flex>
        </Flex>
        <Login />
      </Flex>
    </Box>
  );
};

export default Navbar;
