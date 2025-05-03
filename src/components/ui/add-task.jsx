"use client";

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import useAddTask from "@/hooks/use-add-task";
import { useParams } from "next/navigation";

export const AddTaskModal = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const params = useParams();
  const projectId = params.id;

  const addTask = useAddTask();

  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.description.trim()) return;

    await addTask.mutateAsync({
      title: data.title,
      description: data.description,
      projectId,
    });

    queryClient.invalidateQueries(["tasks", projectId]);
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      motionPreset="slide-in-top"
      closeOnInteractOutside
      open={isOpen}
      onOpenChange={setIsOpen}
      lazyMount
    >
      <Dialog.Trigger asChild>
        <Button variant="outline">
          اضافه کردن تسک
          <LuPlus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>تسک جدید</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field.Root required>
                    <Field.Label>
                      عنوان <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="عنوان تسک" {...register("title")} />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      توضیحات <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="توضیحات" {...register("description")} />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  لغو
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting || addTask.isPending}
                  disabled={addTask.isPending}
                >
                  ذخیره
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
