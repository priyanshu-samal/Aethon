"use client"

import { ErrorView, LoadingView } from "@/components/entity-components"
import { useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflow"

export const EditorLoading=()=>{
    return<LoadingView message="Loading editor..."/>
}

export const EditorError=()=>{
    return<ErrorView message="Loading editor..."/>
}



export const Editor=({workflowId}:{workflowId: string})=>{
    const {data:workflow}=useSuspenseWorkflows(workflowId)

    return(
        <p>
            {JSON.stringify(workflow,null,2)}
        </p>
    )
}