"use client";

import { Box, Spinner, Stack } from "@chakra-ui/react";

export default function Fields() {

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
    </Stack>
  );
}
