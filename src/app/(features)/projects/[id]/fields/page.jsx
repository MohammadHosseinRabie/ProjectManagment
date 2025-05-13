"use client";

import useGetCustomField from "@/hooks/use-get-custom-field";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";

export default function Fields() {
  const { data, isLoading, isError } = useGetCustomField();

  if (isLoading) {
    return (
      <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <Spinner size={"lg"} />
      </Box>
    );
  }
  if (isError) {
    return <Box>خطا در بارگذاری داده‌ها!</Box>;
  }

  return (
    <Flex>
      <VStack mr={"5"} p={"5"} w={"250px"} rounded={"2xl"}>
        <Stack display={"flex"} direction={"row"} w={"full"} justify={"space-between"}>
          <Text textStyle={"2xl"} mb={"5"}>
            فیلد ها
          </Text>
          <Button variant={"outline"} size={"xs"}>
            اضافه کردن
            <CiCirclePlus />
          </Button>
        </Stack>
        {data?.map((fields) => (
          <Button key={fields.id} w={"full"} variant={"outline"}>
            {fields.name}
          </Button>
        ))}
      </VStack>
    </Flex>
  );
}
