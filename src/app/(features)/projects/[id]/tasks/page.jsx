"use client";

import { AddTaskModal } from "@/components/ui/add-task";
import { EditModal } from "@/components/ui/edit-modal";
import deleteTask from "@/hooks/use-delete-task";
import useGetTasks from "@/hooks/use-get-tasks";
import {
  Box,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LuPen, LuTrash } from "react-icons/lu";

export default function ProjectTasks() {
  const params = useParams();
  const projectId = params.id;
  const [loadingId, setLoadingId] = useState(null);
  const { data, isLoading, isError } = useGetTasks(projectId);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onMutate: (id) => {
      setLoadingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setLoadingId(null);
    },
  });
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
  if (!projectId) {
    return <Box>شناسه پروژه نامعتبر است</Box>;
  }

  return (
    <Stack dir="rtl" p={"12"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Text textStyle={"4xl"}>تسک های پروژه</Text>
        <Box>
          <AddTaskModal />
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
        <Table.Body>
          {data?.map((task, index) => (
            <Table.Row key={task.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{task.title}</Table.Cell>
              <Table.Cell>{task.description}</Table.Cell>
              <Table.Cell>{task.status}</Table.Cell>
              <Table.Cell textAlign={"left"}>
                <IconButton
                  variant={"ghost"}
                  onClick={() => mutate(task.id)}
                  isDisabled={loadingId === task.id}
                >
                  {loadingId === task.id ? (
                    <Spinner size="sm" />
                  ) : (
                    <LuTrash />
                  )}
                </IconButton>
              </Table.Cell>
              <Table.Cell>
                <EditModal task={task} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}
