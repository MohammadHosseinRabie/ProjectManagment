import { Button, Tabs } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default function Layout({ children }) {
  return (
    <Tabs.Root defaultValue="Table" p={"14"} variant={"outline"}>
      <Tabs.List dir="rtl">
        <Tabs.Trigger value="Table">Table</Tabs.Trigger>
        <Button alignSelf="center" ms="2" size="2xs" variant="outline">
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>
      <Tabs.Content value="Table" dir="rtl">
        {children}
      </Tabs.Content>
    </Tabs.Root>
  );
}
