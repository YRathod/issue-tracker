'use client'
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {Skeleton} from '@/app/Components/Skeleton'
import toast, {Toaster} from 'react-hot-toast'


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
  <>
    <Select.Root 
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={async (userId) => {
        try {
          const assignedToUserId = userId == " " ? null : userId;
          await axios.patch('/api/issues/' + issue.id, {assignedToUserId});
        } catch(error) {
          toast.error('Changes could not be saved.');
        }

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
    <Toaster></Toaster>
    </>
  )
}

export default AssigneeSelect