import useAddField from "@/hooks/use-add-field";
import { Button, Field, Input, Popover, Portal, Stack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";

export const AddField = () => {
  const params = useParams();
  const projectId = params.id;
  const queryClient = useQueryClient();
  const addField = useAddField();
  const { register, handleSubmit, reset, formState: { isSubmitting }, } = useForm();
  const onSubmit = async (data) => {
    if (!data.name.trim() || !data.type.trim()) return;

    await addField.mutateAsync({
      name: data.name,
      type: data.type,
      projectId,
    });
    queryClient.invalidateQueries(["custom-fields", projectId]);
    reset();
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size="xs" variant="outline">
          اضافه کردن
          <CiCirclePlus />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <Popover.Arrow />
              <Popover.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input placeholder="Name" {...register("name")} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Type</Field.Label>
                    <Input placeholder="Type" {...register("type")} />
                  </Field.Root>
                  <Field.Root>
                    <Button
                      type="submit"
                      loading={isSubmitting || addField.isPending}
                      disabled={addField.isPending}
                    >
                      ذخیره
                    </Button>
                  </Field.Root>
                </Stack>
              </Popover.Body>
              <Popover.CloseTrigger />
            </form>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
