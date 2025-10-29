"use client"
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page =  () => {
  const trpc=useTRPC()
  const queryClient=useQueryClient()
  const {data}= useQuery(trpc.getWorkflow.queryOptions())

  const testAi=useMutation(trpc.testAi.mutationOptions({
    onSuccess:()=>{
      toast.success("AI Execution Triggered")
    }
  }))

  const create=useMutation(trpc.createWorkflow
    .mutationOptions({
    onSuccess:()=>{
      toast.success("Workflow Created")
    }
  }))
  return (
  <>
    <div >
      protected server component
         {JSON.stringify(data,null, 2)}
          
    </div>
    <Button disabled={create.isPending} onClick={()=>{
      create.mutate()
    }}>Create Workflow  

    </Button>
    <Button disabled={testAi.isPending} onClick={()=>{
      testAi.mutate()
    }}>Test AI Execution

    </Button>
  </>
    
  )
}

export default Page