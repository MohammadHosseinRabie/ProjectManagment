import useAddField from "@/hooks/use-add-field";
import {
  Button,
  Field,
  Input,
  NativeSelect,
  Popover,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";

export const AddField = () => {
  const params = useParams();
  const projectId = params.id;
  const queryClient = useQueryClient();
  const addField = useAddField();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.name.trim() || !data.type.trim()) return;

    await addField.mutateAsync({
      name: data.name,
      type: data.type,
      projectId,
    });

    queryClient.invalidateQueries(["custom-fields", projectId]);
    reset();
    setIsOpen(false);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="xs" variant="outline" onClick={() => setIsOpen(true)}>
          اضافه کردن
          <CiCirclePlus />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Popover.Arrow />
              <Popover.Body>
                <Stack gap="4">
                  <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input placeholder="Name" {...register("name")} />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Type</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register("type")}>
                        <option value="SELECT">select</option>
                        <option value="STRING">string</option>
                        <option value="NUMBER">number</option>
                        <option value="DATE">date</option>
                        <option value="BOOLEAN">boolean</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
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
            </form>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
