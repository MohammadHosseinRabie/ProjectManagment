"use client";

import { Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import Profile from "./(features)/profile/page";

export default function Home() {

  return (
    <Flex direction="row" w="full" h="full">
      <Sidebar />
      <Flex direction="column" flex="1">
        <Navbar />
        <Profile />
      </Flex>
    </Flex>
  );
}
