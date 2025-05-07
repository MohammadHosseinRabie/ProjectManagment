"use client";

import { AddModal } from "@/components/ui/add-modal";
import { EditModal } from "@/components/ui/edit-modal";
import deletProject from "@/hooks/use-delet-project";
import useProjects from "@/hooks/use-projects";
import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Pagination,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { LuTrash } from "react-icons/lu";

const Projects = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isLoading, isError } = useProjects(page);
  const [loadingId, setLoadingId] = useState(null);
  const perPage = 10;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletProject,
    onMutate: (id) => {
      setLoadingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", page] });
      setLoadingId(null);
    },
  });

  if (isLoading) {
    return <Box p={"20"}><Spinner size={"md"}/>در حال بارگذاری...</Box> ;
  }

  if (isError) {
    return <Box p={"20"}>خطا در بارگذاری داده‌ها!</Box>;
  }

  return (
    <Stack dir="rtl" p={"12"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Text textStyle={"4xl"}>پروژه ها</Text>
        <Box>
          <AddModal />
        </Box>
      </HStack>
      {data?.data?.length === 0 ? (
        <Box p={"20"}>
          <Text>هیچ پروژه ای برای نمایش وجود ندارد!</Text>
        </Box>
      ) : (
        <>
          <Table.Root size="sm" interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w={"auto"}>ردیف</Table.ColumnHeader>
                <Table.ColumnHeader>پروژه ها</Table.ColumnHeader>
                <Table.ColumnHeader>توضیحات</Table.ColumnHeader>
                <Table.ColumnHeader>تاریخ ساخت</Table.ColumnHeader>
                <Table.ColumnHeader>تاریخ آپدیت</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"left"}>حذف</Table.ColumnHeader>
                <Table.ColumnHeader>ویرایش</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.data?.map((project, index) => (
                <Table.Row key={project.id}>
                  <Table.Cell>{(page - 1) * perPage + index + 1}</Table.Cell>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.description}</Table.Cell>
                  <Table.Cell>{new Date(project.createdAt).toLocaleDateString("fa-IR")}</Table.Cell>
                  <Table.Cell>{new Date(project.updatedAt).toLocaleDateString("fa-IR")}</Table.Cell>
                  <Table.Cell textAlign={"left"}>
                    <IconButton
                      variant={"ghost"}
                      onClick={() => mutate(project.id)}
                      isDisabled={loadingId === project.id}
                    >
                      {loadingId === project.id ? (
                        <Spinner size="sm" />
                      ) : (
                        <LuTrash />
                      )}
                    </IconButton>
                  </Table.Cell>
                  <Table.Cell>
                    <EditModal project={project} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <HStack justify={"center"} align={"center"}>
            <Pagination.Root
              count={data.items}
              pageSize={perPage}
              page={page}
              onPageChange={(e) => setPage(e.page)}
            >
              <ButtonGroup variant="ghost" size="sm">
                <Pagination.PrevTrigger asChild>
                  <IconButton>
                    <HiChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={(page) => (
                    <IconButton variant={{ base: "ghost", _selected: "solid" }}>
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton>
                    <HiChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>
          </HStack>
        </>
      )}
    </Stack>
  );
};

export default Projects;
