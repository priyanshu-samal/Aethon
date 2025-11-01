import type {inferInput} from '@trpc/tanstack-react-query';
import { prefetch, trpc } from '@/trpc/server';

type Input = inferInput<typeof trpc.Workflow.getMany>;



export const prefetchWorkflows = (prams:Input)=>{
    return prefetch(trpc.Workflow.getMany.queryOptions(prams))
    
     
}

export const prefetchWorkflow = (id:string)=>{
    return prefetch(trpc.Workflow.getOne.queryOptions({id}))
    
     
}


