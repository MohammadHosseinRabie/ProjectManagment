"use client";

import { AddTaskModal } from "@/components/ui/add-task";
import { EditModal } from "@/components/ui/edit-modal";
import deleteTask from "@/hooks/use-delete-task";
import useGetCustomField from "@/hooks/use-get-custom-field";
import useGetTasks from "@/hooks/use-get-tasks";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { LuTrash } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import ReactMarkdown from "react-markdown";
import Link from "next/link";


export default function ProjectTasks() {
  const params = useParams();
  const projectId = params.id;
  const [loadingId, setLoadingId] = useState(null);
  const { data, isLoading, isError } = useGetTasks(projectId);
  const { data: customField, isLoading: isLoadingGetCustomField } =
    useGetCustomField(projectId);
  const [showCalendar, setShowCalendar] = useState(false);
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
  if (isLoading & isLoadingGetCustomField) {
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
    <Stack dir="rtl" p={"12"} position={"relative"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Text textStyle={"4xl"}>تسک های پروژه</Text>
        <Box>
          <Button variant={"outline"} ml={"2"}>
            <Link href={`/projects/${projectId}/fields`}>ویرایش فیلد ها</Link>
          </Button>
          <AddTaskModal />
        </Box>
      </HStack>
      <Table.ScrollArea maxW={"1200px"}>
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={"auto"}>ردیف</Table.ColumnHeader>
              <Table.ColumnHeader>عنوان</Table.ColumnHeader>
              <Table.ColumnHeader>توضیحات</Table.ColumnHeader>
              <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
              <Table.ColumnHeader>تاریخ ساخت</Table.ColumnHeader>
              <Table.ColumnHeader>تاریخ آپدیت</Table.ColumnHeader>
              {customField?.map((field) => (
                <Table.ColumnHeader key={field.id}>
                  {field.name}
                </Table.ColumnHeader>
              ))}
              <Table.ColumnHeader textAlign={"left"}>حذف</Table.ColumnHeader>
              <Table.ColumnHeader>ویرایش</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((task, index) => (
              <Table.Row key={task.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>
                  <Box maxW="250px" whiteSpace="pre-wrap">
                    <ReactMarkdown>{task.description}</ReactMarkdown>
                  </Box>
                </Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>
                  {new Date(task.createdAt).toLocaleDateString("fa-IR")}
                </Table.Cell>
                <Table.Cell>
                  {new Date(task.updatedAt).toLocaleDateString("fa-IR")}
                </Table.Cell>
                {customField?.map((field) => {
                  switch (field.type) {
                    case "STRING":
                      return (
                        <Table.Cell key={field.id}>
                          <Input />
                        </Table.Cell>
                      );
                    case "NUMBER":
                      return (
                        <Table.Cell key={field.id}>
                          <Input type="number" />
                        </Table.Cell>
                      );
                    case "SELECT":
                      return (
                        <Table.Cell key={field.id}>
                          <NativeSelect.Root size="sm" mb={2}>
                            <NativeSelect.Field defaultValue={field.value}>
                              {field.options?.map((opt, index) => (
                                <option key={index} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        </Table.Cell>
                      );
                    case "DATE":
                      return (
                        <Table.Cell key={field.id}>
                          <Text
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            {new Date(field.updatedAt).toLocaleDateString(
                              "fa-IR"
                            )}

                            <IconButton
                              variant="ghost"
                              justifyContent="center"
                              alignItems="center"
                              onClick={() => setShowCalendar((prev) => !prev)}
                              ml={2}
                            >
                              <CiCalendarDate size={25} />
                            </IconButton>

                            {showCalendar && (
                              <Box
                                style={{
                                  position: "absolute",
                                  top: "0",
                                  zIndex: 9999,
                                }}
                              >
                                <DatePicker
                                  selected={field.updatedAt}
                                  inline
                                  onClickOutside={() => setShowCalendar(false)}
                                />
                              </Box>
                            )}
                          </Text>
                        </Table.Cell>
                      );
                    case "BOOLEAN":
                      return (
                        <Table.Cell key={field.id} textAlign={"center"}>
                          <Checkbox.Root>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                          </Checkbox.Root>
                        </Table.Cell>
                      );
                  }
                })}
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
      </Table.ScrollArea>
    </Stack>
  );
}
