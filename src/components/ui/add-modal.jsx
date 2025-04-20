"use client";

import addNewProject from "@/hooks/use-add-project";
import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { project } from "@/hooks/use-projects";
import { useForm } from "react-hook-form";

export const AddModal = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useState(() => {
    if (project) {
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("price", project.price);
    }
  }, [project, setValue]);

  const addProject = useMutation({
    mutationFn: addNewProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      reset();
    },
  });
  const onSubmit = async (data) => {
    if (!data.title.trim() || !data.description.trim() || !data.price.trim())
      return;

    await addProject.mutateAsync({
      id: project?.id,
      title: data.title,
      description: data.description,
      price: data.price,
    });
  };
  return (
    <Dialog.Root motionPreset={"slide-in-top"}>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          اضافه کردن
          <LuPlus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>اضافه کردن</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <Stack gap="4">
                  <Field.Root required>
                    <Field.Label>
                      نام پروژه <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="نام پروژه" {...register("title")} />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      توضیحات <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="توضیحات" {...register("description")} />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      قیمت <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="قیمت" {...register("price")} />
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">لغو</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button type="submit">ذخیره</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
