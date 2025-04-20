"use client"

import { Button, Field, Fieldset, Flex, Input, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input"

export default function Login() {

  const handleSetToken = () => {
    const token = "skjlnfvierjnvunwieufhwuihnivwuohf873hcjknda";
    localStorage.setItem("authToken", token);
    console.log(token)
  };

  return (
    <Flex align={"center"} justify={"center"} h={"lvh"}>
      <Fieldset.Root
        size="lg"
        maxW="md"
        bgColor={"teal.800"}
        p={"8"}
        rounded={"3xl"}
      >
        <Stack>
          <Fieldset.Legend>ورود</Fieldset.Legend>
          <Fieldset.HelperText>
            لطفا نام کاربری و رمز عبور را وارد نمایید.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>نام کاربری</Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root>
            <Field.Label>رمز عبور</Field.Label>
            <PasswordInput name="password" type="password" />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" onClick={handleSetToken} asChild>
          <Link href={"/"}>ورود</Link>
        </Button>
      </Fieldset.Root>
    </Flex>
  );
}
