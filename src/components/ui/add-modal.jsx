"use client";

import addNewProject from "@/hooks/use-add-project";
import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { project } from "@/hooks/use-projects";
import { useForm } from "react-hook-form";

export const AddModal = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("description", project.description);
    }
  }, [project, setValue]);

  const addProject = useMutation({
    mutationFn: addNewProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      reset();
      setIsOpen(false);
    },
  });
  const onSubmit = async (data) => {
    if (!data.name.trim() || !data.description.trim())
      return;

    await addProject.mutateAsync({
      id: project?.id,
      name: data.name,
      description: data.description,
    });
  };
  return (
    <Dialog.Root
      motionPreset={"slide-in-top"}
      open={isOpen}
      onOpenChange={setIsOpen}
      lazyMount
    >
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
                    <Input placeholder="نام پروژه" {...register("name")} />
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
                  <Button variant="outline" onClick={()=> setIsOpen(false)}>لغو</Button>
                <Button
                  type="submit"
                  loading={isSubmitting || addProject.isPending}
                  disabled={addProject.isPending}
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
