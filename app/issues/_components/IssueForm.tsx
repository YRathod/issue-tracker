'use client';
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller, set } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import{ z } from 'zod';
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '@/app/Components/Spinner';
import { Issue } from '@prisma/client';
import dynamic from 'next/dynamic';

//const SimpleMDE = dynamic(() => import('react-simplemde-editor'), ssr: false)

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {

const { register, control , handleSubmit, formState:{ errors}} = useForm<IssueFormData>(
  {resolver: zodResolver(createIssueSchema)}
);
const [isSubmitting, setSubmitting] = useState(false);
const router = useRouter();
const [error, setError] = useState('')

const onSubmit = handleSubmit(async data =>{
  try {
    setSubmitting(true);
    await axios.post('/api/issues', data)
    router.push('/issues');
  } catch (error) {
    console.log(error);
    setSubmitting(false);
    setError('An Unexpected error ocurred');
  }
  })

  return (
    <div className='max-w-xl'>
      {error &&<Callout.Root className='mb-5' color='red'>
         <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' 
        onSubmit={onSubmit}>
          <TextField.Root>
              <TextField.Input defaultValue={issue?.title} placeholder='Title'  {...register('title')}></TextField.Input>
          </TextField.Root>
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          <Controller
              name='description'
              control = {control}
              defaultValue={issue?.description}
              render = {({field}) =><SimpleMDE  placeholder='Description' {...field}/>}
          ></Controller>
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>

          <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner></Spinner>}</Button>
      </form>
    </div>
  )
}

export default IssueForm