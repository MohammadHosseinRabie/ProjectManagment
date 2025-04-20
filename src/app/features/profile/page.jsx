import {
  FieldLabel,
  FieldRoot,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex dir="rtl" p={"12"} direction={"column"}>
      <HStack w={"full"} mb={"10"}>
        <Text textStyle={"4xl"}>حساب کاربری</Text>
      </HStack>
      <Grid templateColumns="repeat(2, 1fr)" gap="6">
        <GridItem colSpan={1}>
          <FieldRoot>
            <FieldLabel>نام کاربری</FieldLabel>
            <Input name="name" disabled placeholder="نام کاربری" />
          </FieldRoot>
        </GridItem>
        <GridItem colSpan={1}>
          <Image src="https://picsum.photos/150" borderRadius={"full"} />
        </GridItem>
        <GridItem colSpan={1}>
          <FieldRoot>
            <FieldLabel>ایمیل</FieldLabel>
            <Input name="email" disabled placeholder="ایمیل" />
          </FieldRoot>
        </GridItem>
        <GridItem colSpan={1}>
          <FieldRoot>
            <FieldLabel>شماره تماس</FieldLabel>
            <Input disabled placeholder="شماره تماس" />
          </FieldRoot>
        </GridItem>
      </Grid>
    </Flex>
  );
}
