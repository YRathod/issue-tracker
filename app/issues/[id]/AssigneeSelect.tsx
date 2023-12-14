'use client'
import { Select } from "@radix-ui/themes"

const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder="Assignee"></Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="1" >Yogesh Rathod</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect