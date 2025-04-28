"use client";

import { AddModal } from "@/components/ui/add-modal";
import getTasks from "@/hooks/use-get-tasks";
import {
  Box,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { LuPen, LuTrash } from "react-icons/lu";

export default function ProjectTasks() {
  const params = useParams();
  const projectId = params.id;
  const { data, isLoading, isError } = getTasks(projectId);
  if (isLoading) {
    return (
      <Box>
        <Spinner size={"md"} />
        در حال بارگذاری...
      </Box>
    );
  }
  if (isError) {
    return <Box>خطا در بارگذاری داده‌ها!</Box>;
  }

  return (
    <Stack dir="rtl" p={"12"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Text textStyle={"4xl"}>تسک های پروژه</Text>
        <Box>
          <AddModal />
        </Box>
      </HStack>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={"auto"}>ردیف</Table.ColumnHeader>
            <Table.ColumnHeader>نام</Table.ColumnHeader>
            <Table.ColumnHeader>گروه بندی</Table.ColumnHeader>
            <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"left"}>حذف</Table.ColumnHeader>
            <Table.ColumnHeader>ویرایش</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        {data?.map((task, index) => (
          <Table.Body key={task.id}>
            <Table.Row>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{task.title}</Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>{task.status}</Table.Cell>
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
        ))}
      </Table.Root>
    </Stack>
  );
}
