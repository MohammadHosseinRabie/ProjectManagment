import { Button,  VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ProjectsList } from "./projects-list";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
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
      <ProjectsList />
      <Button
        asChild
        size={"2xl"}
        w={"full"}
        colorPalette={"cyan"}
        variant={pathname === "/projects" ? "subtle" : 'outline'}
        rounded={"full"}
      >
        <Link href="/projects">پروژه ها</Link>
      </Button>
    </VStack>
  );
};
