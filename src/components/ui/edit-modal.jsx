"use client";

import {
  Button,
  Dialog,
  Field,
  IconButton,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPen } from "react-icons/lu";

export const EditModal = ({ project }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useState(() => {
    if (project) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("price", project.price);
    }
  }, [project, setValue]);

  const editProject = useMutation({
    mutationFn: async ({ id, title, description, price }) => {
      const { data } = await axios.patch(
        `http://localhost:3001/projects/${id}`,
        {
          title,
          description,
          price,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      reset();
    },
  });

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.description.trim() || !data.price.trim())
      return;

    await editProject.mutateAsync({
      id: project?.id,
      title: data.title,
      description: data.description,
      price: data.price,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton variant={"ghost"}>
          <LuPen />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Header>
              <Dialog.Title>ویرایش</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>نام پروژه</Field.Label>
                  <Input {...register("title", { required: "نام پروژه ضروری است" })} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>توضیحات</Field.Label>
                  <Input {...register("description", { required: "توضیحات ضروری است" })} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>قیمت</Field.Label>
                  <Input {...register("price", { required: "قیمت ضروری است" })} />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">لغو</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button type="submit" isLoading={isSubmitting || editProject.isPending}>
                  ذخیره
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer></form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
