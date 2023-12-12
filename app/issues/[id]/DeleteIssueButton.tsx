'use client';
import { Spinner } from '@/app/Components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const deleteIssue = async () => {
        try{
            //throw new Error()
            setIsDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues');
            router.refresh()
        }catch(error){
            setIsDeleting(false)
            setError(true)
        }
    }
  return (
    <>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color="red" disabled={isDeleting}>
                Delete Issue
                {isDeleting && <Spinner></Spinner>}
            </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
            <Flex direction="row" mt="4" gap="3">
                <AlertDialog.Cancel>
                    <Button color="gray" variant='soft'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button color="red" onClick={
                      deleteIssue
                    }> Delete Issue </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This Issue cannot be deleted.</AlertDialog.Description>
            <Button mt="2" variant='soft' color='gray' onClick={() => setError(false)}>Ok</Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton