import { Button,  VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  return (
    <VStack h="lvw" w="80" height={"svh"} pt={"8"}>
      <Button
        size={"2xl"}
        w={"full"}
        colorPalette={"gray"}
        variant={"outline"}
        rounded={"full"}
      >
        Logo
      </Button>
      <Button
        asChild
        size={"2xl"}
        w={"full"}
        colorPalette={"teal"}
        variant={"subtle"}
        rounded={"full"}
      >
        <Link href="/features/tasks">تسک ها</Link>
      </Button>
      <Button
        asChild
        size={"2xl"}
        w={"full"}
        colorPalette={"teal"}
        variant={"subtle"}
        rounded={"full"}
      >
        <Link href="/features/projects">پروژه ها</Link>
      </Button>
    </VStack>
  );
};
