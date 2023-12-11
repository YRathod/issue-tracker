import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

  if(!issue) notFound();
  
  delay(3000);

  return (
    <Grid columns={{initial:"1", md: "2"}} gap="5">
      <Box>
          <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
          <EditIssueButton issueId={issue.id}></EditIssueButton>  
      </Box>
    </Grid>
  )
}

export default IssueDetailPage