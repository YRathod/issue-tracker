import React from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(
    () => import('../../_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton></IssueFormSkeleton>
    }
)
interface Props {
    params: {id: string}
}
const EditIssuePage = async ({params}: Props) => {
    const issue = await prisma?.issue.findUnique({
        where : { id: parseInt(params.id)}
    })

    if(!issue) notFound();

  return (
    <IssueForm issue={issue}></IssueForm>
  )
}

export default EditIssuePage