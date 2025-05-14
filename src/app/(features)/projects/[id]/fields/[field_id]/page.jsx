"use client";

import useGetField from "@/hooks/use-get-fields";
import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function Fields() {
  const params = useParams();
  const fieldId = params.field_id;
  const { data, isLoading, isError } = useGetField(fieldId);

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
    <Stack>
      <Text>{data.name}</Text>
      <Text>{data.type}</Text>
      {data?.options?.map((opt, index) => (
        <Text key={index}>{opt}</Text>
      ))}
    </Stack>
  );
}
