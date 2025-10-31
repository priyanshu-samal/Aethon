"use client";

import { EntityHeader,
     EntityContainer,
      EntitySearch, 
      EntityPagination} from "@/components/entity-components";
import { useSuspenseWorkflow, useCreateWorkflow } from "../hooks/use-workflow";
import { create } from "domain";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";

export const WorkflowSearch=()=>{
    const [params, setParams]=useWorkflowsParams()
    const {searchValue, onSearchChange}=useEntitySearch({
        params,
        setParams
    })

    return(
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows"
        />
    )
}


export const WorkflowsList=()=>{
    const workflows=useSuspenseWorkflow();

    return(
      <div className="flex-1 flex justify-center items-center">
          <p>
{JSON.stringify(workflows, null, 2)}
        </p>
      </div>
    )



}

export const WorkflowsHeader=({disabled}:{disabled?:boolean})=>{

    const createWorkflow=useCreateWorkflow();
    const {handleError, model}= useUpgradeModel();
    const router=useRouter();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined,{
            onSuccess: (data)=>{
                router.push(`/workflows/${data.id}`);
            },
            onError: (error)=>{
                handleError(error);
            },
        })
    }

    return(
        <>
        {model}
        <EntityHeader
            title="Workflows"
            description="Create and manage your workflows"
            onNew={handleCreate}
            newButtonLabel="New Workflow"
            disabled={disabled}
            isCreating={createWorkflow.isPending}
/>
        </>
    )
}

export const WorkflowsPagination=()=>{
    const workflows=useSuspenseWorkflow()
    const [params, setParams]= useWorkflowsParams()

    return (
        <EntityPagination
        disabled={workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page)=> setParams({...params, page})}
        />
    )
}

export const WorkflowsContainer =({
    children
}:{
    children:React.ReactNode
}) =>{
    return(
        <EntityContainer
        header={<WorkflowsHeader/>}
        search={<WorkflowSearch/>}
        pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    )
}

