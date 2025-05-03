"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  

  return (
    <Flex direction="row" w="full" h="full">
      <Sidebar />
      <Flex direction="column" flex="1">
        <Navbar />
        {children}
      </Flex>
    </Flex>
  );
}
