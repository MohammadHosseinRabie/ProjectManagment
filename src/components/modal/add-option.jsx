import useAddOption from "@/hooks/use-add-option";
import { Button, Field, Input, Popover, Portal, Stack } from "@chakra-ui/react"
import { useParams } from "next/navigation"
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci"


export const AddOption = () => {
  const param = useParams();
  const projectId = param.id;
  const fieldId = param.field_id;
  const [ optionName, setOptionName ] = useState("");
  const { mutate: addOption, isLoading } = useAddOption();

  const handleSave = () => {
    if(!optionName.trim()) return;
    addOption({
      projectId,
      fieldId,
      options: [optionName]
    });
    setOptionName("");
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button><CiCirclePlus />add option </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Stack gap={"4"}>
                <Field.Root>
                  <Field.Label>option</Field.Label>
                  <Input placeholder="option name" value={optionName} onChange={(e) => setOptionName(e.target.value)}/>
                </Field.Root>
                <Field.Root>
                  <Button onClick={handleSave} isLoading={isLoading}>save</Button>
                </Field.Root>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}