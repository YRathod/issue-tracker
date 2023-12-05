import React from 'react'
import { Box } from '@radix-ui/themes';
import { Skeleton } from '../../Components/Skeleton';

const LoadingNewIssue = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton></Skeleton>
      <Skeleton height="20rem"></Skeleton>
    </Box>
  )
}

export default LoadingNewIssue