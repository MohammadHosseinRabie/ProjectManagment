import { AddModal } from "@/components/ui/add-modal";
import { Box, HStack, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import React from "react";
import { LuPen, LuTrash } from "react-icons/lu";

export default function Tasks() {
  return (
    <Stack dir="rtl" p={"12"}>
      <HStack w={"full"} justifyContent={"space-between"}>
        <Text textStyle={"4xl"}>تسک ها</Text>
        <Box>
          <AddModal />
        </Box>
      </HStack>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={"auto"}>ردیف</Table.ColumnHeader>
            <Table.ColumnHeader>تسک ها</Table.ColumnHeader>
            <Table.ColumnHeader>گروه بندی</Table.ColumnHeader>
            <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"left"}>حذف</Table.ColumnHeader>
            <Table.ColumnHeader>ویرایش</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>فوتبال</Table.Cell>
            <Table.Cell>ورزش</Table.Cell>
            <Table.Cell>انجام نشده!</Table.Cell>
            <Table.Cell textAlign={"left"}>
              <IconButton variant={"ghost"}>
                <LuTrash />
              </IconButton>
            </Table.Cell>
            <Table.Cell>
              <IconButton variant={"ghost"}>
                <LuPen />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}
