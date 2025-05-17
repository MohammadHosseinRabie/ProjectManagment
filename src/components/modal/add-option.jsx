import { Button, Field, Input, Popover, Portal, Stack } from "@chakra-ui/react"
import { CiCirclePlus } from "react-icons/ci"


export const AddOption = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button><CiCirclePlus />add option </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Stack>
                <Field.Root>
                  <Field.Label>option</Field.Label>
                  <Input placeholder="option name"/>
                </Field.Root>
                <Field.Root>
                  <Button>save</Button>
                </Field.Root>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}