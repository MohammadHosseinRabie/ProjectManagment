"use client"

import { Avatar, Button, HStack, IconButton, Menu, Portal } from "@chakra-ui/react";
import React from "react";
import { LuSun } from "react-icons/lu";
import { useColorMode } from "../ui/color-mode";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <HStack dir="ltr" pl={"12"} px={"5"} h={"20"} w={"full"} bgColor={"whiteAlpha.100"}>
      <Menu.Root>
        <Menu.Trigger asChild cursor={"pointer"}>
          <Button size="sm" unstyled>
            <Avatar.Root>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt" asChild>
                <Link href={"/profile"}>حساب کاربری</Link>
              </Menu.Item>
              <Menu.Item value="new-file" onClick={handleLogOut}>خروج از حساب کاربری</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <IconButton size={"2xs"} rounded={"full"} ml={"5"} onClick={toggleColorMode}>
        <LuSun />
      </IconButton>
    </HStack>
  );
};
