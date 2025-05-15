"use client";

import deleteField from "@/hooks/use-delete-field";
import useGetField from "@/hooks/use-get-fields";
import {
  Box,
  Button,
  ButtonGroup,
  Field,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";

export default function Fields() {
  const params = useParams();
  const router = useRouter();
  const fieldId = params.field_id;
  const projectId = params.id;
  const { data, isLoading, isError } = useGetField({fieldId, projectId});
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      router.push(`/projects/${projectId}/fields`);
    },
  });
  

  if (isLoading) {
    return (
      <Box p={"20"}>
        <Spinner size={"md"} />
        در حال بارگذاری...
      </Box>
    );
  }

  if (isError) {
    return <Box p={"20"}>خطا در بارگذاری داده‌ها!</Box>;
  }
console.log(data)
  return (
    <Stack display={"flex"} p={"10"}>
      <Field.Root>
        <Field.Label>field name</Field.Label>
        <Input value={data.name} readOnly/>
      </Field.Root>
      <Field.Root>
        <Field.Label>field type</Field.Label>
        <Input value={data.type} readOnly disabled />
      </Field.Root>
      {data?.type === "SELECT" && data?.options && data?.options.length > 0 ? (
        <Field.Root>
          <Field.Label>field options</Field.Label>
          {data?.options?.map((opt, index) => (
            <Input readOnly value={opt} key={index} />
          ))}
        </Field.Root>
      ) : (
        ""
      )}
      <ButtonGroup>
        <Button
          size={"xs"}
          w={"5/12"}
          mt={"5"}
          variant={"surface"}
          onClick={() => mutate({ id: fieldId, projectId })}
        >
          حذف فیلد
          <CiTrash />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
