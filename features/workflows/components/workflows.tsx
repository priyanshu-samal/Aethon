"use client";

import {
    EntityHeader,
    EntityContainer,
    EntitySearch,
    EntityPagination,
    LoadingView,
    EntityTable,
    ErrorView,
    EmptyView,
    EmptyState,
    EntityList
} from "@/components/entity-components";
import { useSuspenseWorkflow, useCreateWorkflow } from "../hooks/use-workflow";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Workflow } from "lucide-react";


export const WorkflowSearch = () => {
    const [params, setParams] = useWorkflowsParams()
    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams
    })

    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search workflows"
        />
    )
}

export const WorkflowsList = () => {
    
    const workflows = useSuspenseWorkflow();
    return(
        <EntityList
        items={workflows.data.items}
        getKey={(workflow)=>workflow.id}
        renderItem={(workflow)=><p>{workflow.name}</p>}
        emptyView={<WorkflowsEmpty/>}
        />
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {

    const createWorkflow = useCreateWorkflow();
    const { handleError, model } = useUpgradeModel();
    const router = useRouter();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError: (error) => {
                handleError(error);
            },
        })
    }

    return (
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

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflow()
    const [params, setParams] = useWorkflowsParams()

    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => setParams({ ...params, page })}
        />
    )
}

export const WorkflowsContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<WorkflowSearch />}
            pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsLoading = () => {
    
    return (
        <LoadingView message="Loading Workflows..." />
    )
}

export const WorkflowsError = () => {
    return (
        <ErrorView message="Error loading workflows..." />
    )
}

interface WorkflowsEmptyProps {
    message?: string;
    showNew?: boolean;
}

export const WorkflowsEmpty = ({ message, showNew = true }: WorkflowsEmptyProps) => {
    const createWorkflow = useCreateWorkflow()
    const { handleError, model } = useUpgradeModel()
    const router = useRouter()


    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error)
            },
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            }
        })
    }

    return (
        <>
            {model}
            <EmptyView
                onNew={showNew ? handleCreate : undefined}
                message={message || "No workflow created, Get Started by creating workflow"}
            />
        </>
    )
}