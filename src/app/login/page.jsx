"use client";

import { useForm } from "react-hook-form";
import { Button, Field, Fieldset, Flex, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import login from "@/hooks/use-login";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const resp = await login(data);
      if (resp.token) {
        localStorage.setItem("token", resp.token);
        document.cookie = `token=${resp.token}; path=/projects; max-age=3600`;
        router.push("/projects");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root
          size="lg"
          maxW="md"
          border={"xs"}
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
              <Input {...register("email")} type="email" name="email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>رمز عبور</Field.Label>
              <PasswordInput
                {...register("password")}
                name="password"
                type="password"
              />
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            ورود
          </Button>
        </Fieldset.Root>
      </form>
    </Flex>
  );
}
