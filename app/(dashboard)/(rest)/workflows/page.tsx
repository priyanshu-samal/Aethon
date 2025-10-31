import React, { Suspense } from 'react'
import page from '../executions/page'
import { requireAuth } from '@/lib/auth-utils'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { HydrateClient } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import { WorkflowsContainer, WorkflowsList } from '@/features/workflows/components/workflows'
import { WorkflowParamsLoader } from '../../../../features/workflows/server/params-loader'
import { SearchParams } from 'nuqs'

type Props={
  searchParams:Promise<SearchParams>
  
}

const Page = async({searchParams}:Props) => {
  await requireAuth()
  const params=await WorkflowParamsLoader(searchParams);
  prefetchWorkflows(params)
    return (
    <WorkflowsContainer>
      <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
      <Suspense fallback={<p>Loading...</p>}  >
        <WorkflowsList/>
      </Suspense>
          
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>


  )
}

export default Page;