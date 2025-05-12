"use client";

import useGetCustomField from "@/hooks/use-get-custom-field";
import { Box, Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Fields() {
  const { data, isLoading, isError } = useGetCustomField();

  if (isLoading) {
    return (
      <Box>
        <Spinner size={"md"} />
        در حال بارگذاری...
      </Box>
    );
  }
  if (isError) {
    return <Box>خطا در بارگذاری داده‌ها!</Box>;
  }
  console.log(data)

  return (
    <Flex>
      <VStack>
        <Text>فیلد ها</Text>
        {data?.map((fields) => (
          <Button key={fields.id}>{fields.name}</Button>
        ))
        }
      </VStack>
    </Flex>
  );
}
