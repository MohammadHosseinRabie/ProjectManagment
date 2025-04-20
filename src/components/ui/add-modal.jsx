"use client";

import addNewProject from "@/hooks/use-add-project";
import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";

export const AddModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const queryClient = useQueryClient();

  const addProject = useMutation({
    mutationFn: addNewProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !price.trim()) {
      return;
    }
    addProject.mutate({ title, description, price });
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
            <Dialog.Header>
              <Dialog.Title>اضافه کردن</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root required>
                  <Field.Label>
                    نام پروژه <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="نام پروژه"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    توضیحات <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="توضیحات"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    قیمت <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="قیمت"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">لغو</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={handleClick}>ذخیره</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
