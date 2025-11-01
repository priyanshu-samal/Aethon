import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";



export const useSuspenseWorkflow = () => {
    const trpc = useTRPC();
    const [params]=useWorkflowsParams()

    return useSuspenseQuery(trpc.Workflow.getMany
        .queryOptions(params))

}

export const useCreateWorkflow= ()=>{
    const trpc=useTRPC();
    const queryClient=useQueryClient()
   

    return useMutation(
        trpc.Workflow.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.Workflow.getMany.queryOptions({})
                )

            },
            onError: (error) => {
                toast.error(`Error creating workflow: ${error.message}`);
            },
            
        })
    )

}

export const useRemoveWorkflow=()=>{
    const trpc=useTRPC()
    const queryClient=useQueryClient()

    return useMutation(
        trpc.Workflow.remove.mutationOptions({
            onSuccess:(data)=>{
                toast.success(`Workflow "${data.name}" removed`);
    queryClient.invalidateQueries(trpc.Workflow.getMany.queryOptions(
        {}))
        queryClient.invalidateQueries(
            trpc.Workflow.getOne.queryFilter({id: data.id})
        )
            }

        })
    )
}