import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../../Components/IssueStatusBadge'
import delay from 'delay';
import IssueActions from './IssueActions'
import Link from '../../Components/Link';
import { Status } from '@prisma/client';

interface Props {
  searchParams: { status : Status}
}

const IssuesPage = async ({searchParams}: {searchParams: {status: Status}}) => {
  const issues = await prisma.issue.findMany({
    where : {
      status: searchParams.status
    }
  });
  console.log(searchParams.status)
  await delay(2000);

  return (
    <div>
      <IssueActions></IssueActions>
      <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues && issues.map(issue =>
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className='block md:hidden'>{issue.status}</div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
            )
           }
          </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic  = 'force-dynamic';

//export const revalidate = 0; //revalidate every 0 sec

export default IssuesPage