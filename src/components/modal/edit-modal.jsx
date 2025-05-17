"use client";

import { axiosClient } from "@/hooks/axios-client";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPen } from "react-icons/lu";

export const EditModal = ({ task }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useState(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
    }
  }, [task, setValue]);

  const editTasks = useMutation({
    mutationFn: async ({ id, title, description }) => {
      const { data } = await axiosClient.put(`/tasks/${id}`, {
        title,
        description,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      reset();
    },
  });

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.description.trim()) return;

    await editTasks.mutateAsync({
      id: task?.id,
      title: data.title,
      description: data.description,
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
                    <Field.Label>نام تسک</Field.Label>
                    <Input
                      {...register("title", { required: "نام تسک ضروری است" })}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>توضیحات</Field.Label>
                    <Input
                      {...register("description", {
                        required: "توضیحات ضروری است",
                      })}
                    />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">لغو</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button
                    type="submit"
                    isLoading={isSubmitting || editTasks.isPending}
                  >
                    ذخیره
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
