"use client";

import { useState, useEffect } from "react";
import deleteField from "@/hooks/use-delete-field";
import useGetField from "@/hooks/use-get-fields";
import putEditField from "@/hooks/use-edit-field";
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
  const { data, isLoading, isError } = useGetField({ fieldId, projectId });
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [fieldName, setFieldName] = useState("");

  useEffect(() => {
    if (data?.name) {
      setFieldName(data.name);
    }
  }, [data]);

  const deleteMutation = useMutation({
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      router.push(`/projects/${projectId}/fields`);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ fieldId, projectId, name }) =>
      putEditField({ fieldId, projectId, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      setEditMode(false);
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

  return (
    <Stack display={"flex"} p={"10"}>
      <Field.Root>
        <Field.Label>field name</Field.Label>
        {editMode ? (
          <>
            <Input
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              autoFocus
            />
            <Stack display={"flex"}>
              <Button
                size="sm"
                variant={"surface"}
                mt={2}
                onClick={() =>
                  editMutation.mutate({ fieldId, projectId, name: fieldName })
                }
              >
                ذخیره
              </Button>
              <Button
                size="sm"
                variant={"surface"}
                mt={2}
                mr={2}
                onClick={() => {
                  setEditMode(false);
                  setFieldName(data.name);
                }}
              >
                لغو
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Input value={data.name} readOnly />
            <Button
              size="sm"
              mt={2}
              variant={"surface"}
              onClick={() => setEditMode(true)}
            >
              ویرایش
            </Button>
          </>
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>field type</Field.Label>
        <Input value={data.type} readOnly disabled />
      </Field.Root>
      {data?.type === "SELECT" ? (
        <Button>add option</Button>
      ) : ("")}
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
          onClick={() => deleteMutation.mutate({ id: fieldId, projectId })}
        >
          حذف فیلد
          <CiTrash />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
