'use client'
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {Skeleton} from '@/app/Components/Skeleton'


const AssigneeSelect = ({issue}: {issue: Issue}) => {
  const {data: users, error, isLoading} = useQuery<User[]>(['users'],
    () => axios.get('/api/users').then(res => res.data),
    {
      staleTime: 60 * 1000
    })

  if(isLoading){
    return <Skeleton></Skeleton>
  }
  if(error) return null;
  return (
    <Select.Root 
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => {
        const assignedToUserId = userId == " " ? null : userId
        axios.patch('/api/issues/' + issue.id, {assignedToUserId})
      }}>
        <Select.Trigger placeholder="Assign.."></Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value=" ">UnAssigned</Select.Item>
                {users?.map(user => <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect