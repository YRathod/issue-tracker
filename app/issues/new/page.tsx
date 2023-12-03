'use client';
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm, Controller, set } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}
const NewIssuePage = () => {
const { register, control , handleSubmit} = useForm<IssueForm>();
const router = useRouter();
const [error, setError] = useState('')
  return (
    <div className='max-w-xl'>
      {error &&<Callout.Root className='mb-5' color='red'>
         <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' 
        onSubmit={handleSubmit(async data =>{
          try {
            await axios.post('/api/issues', data)
            router.push('/issues');
          } catch (error) {
            console.log(error);          
            setError('An Unexpected error ocurred');
          }
          })}>
          <TextField.Root>
              <TextField.Input placeholder='Title'  {...register('title')}></TextField.Input>
          </TextField.Root>
          <Controller
              name='description'
              control = {control}
              render = {({field}) =><SimpleMDE  placeholder='Description' {...field}/>}
          ></Controller>
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage