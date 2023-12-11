import React from 'react'
import { Card, Heading, Flex, Text, Box } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/Components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown';
import { Issue } from '@prisma/client'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
    <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className='prose' mt="4">
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueDetails