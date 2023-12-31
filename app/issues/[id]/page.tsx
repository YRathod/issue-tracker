import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({params}: Props) => {
  const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

  if(!issue) notFound();
  
  delay(3000);

  return (
    <Grid columns={{initial:"1", sm: "5"}} gap="5">
      <Box className='md:col-span-4'>
          <IssueDetails issue={issue}></IssueDetails>
      </Box>
      {session && <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue}></AssigneeSelect>
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
      </Box>}
    </Grid>
  )
}

export default IssueDetailPage