"use client";

import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) router.replace("/login");
  }, []);

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
