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
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { LuTrash } from "react-icons/lu";

const Projects = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isLoading, isError } = useProjects(page);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", page] });
    },
  });

  if (isLoading) {
    return <Spinner size={"xl"} />;
  }

  if (isError) {
    return <div>خطا در بارگذاری داده‌ها!</div>;
  }

  return (
    <Stack dir="rtl" p={"12"}>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Text textStyle={"4xl"}>پروژه ها</Text>
        <Box>
          <AddModal Projects={data.project} />
        </Box>
      </HStack>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={"auto"}>ردیف</Table.ColumnHeader>
            <Table.ColumnHeader>پروژه ها</Table.ColumnHeader>
            <Table.ColumnHeader>توضیحات</Table.ColumnHeader>
            <Table.ColumnHeader>قیمت</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"left"}>حذف</Table.ColumnHeader>
            <Table.ColumnHeader>ویرایش</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data?.map((project, index) => (
            <Table.Row key={project.id}>
              <Table.Cell>{(page - 1) * 10 + index + 1}</Table.Cell>
              <Table.Cell>{project.title}</Table.Cell>
              <Table.Cell>{project.description}</Table.Cell>
              <Table.Cell>{project.price}</Table.Cell>
              <Table.Cell textAlign={"left"}>
                <IconButton
                  variant={"ghost"}
                  onClick={() => mutate(project.id)}
                >
                  <LuTrash />
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
          count={100}
          pageSize={10}
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
    </Stack>
  );
};

export default Projects;
