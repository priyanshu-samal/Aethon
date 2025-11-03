'use client'

import { useTheme } from 'next-themes'
import { Moon, SaveIcon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import{
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbSeparator,
   BreadcrumbList
}from "@/components/ui/breadcrumb"
import {Input} from "@/components/ui/input"
import {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import { useSuspenseWorkflows, useUpdateWorkflow, useUpdateWorkflowName } from "../../workflows/hooks/use-workflow";
import { useAtomValue } from 'jotai'
import { editorAtom } from '../store/atoms'
import { id } from 'date-fns/locale'

export const EditorSaveButton=({workflowId}:{workflowId:string})=>{
    const editor= useAtomValue(editorAtom)
    const saveWorkflow=useUpdateWorkflow()

    const handleSave=()=>{
        if(!editor){
            return
        }
        const nodes= editor.getNodes()
        const edges=editor.getEdges()

        saveWorkflow.mutate({
            id:workflowId,
            node: nodes,
            edges,

        })
    }
    return(
        <div className='ml-auto'>
            <Button size="sm" onClick={handleSave } disabled={saveWorkflow.isPending}>
                <SaveIcon className="size-4 " >
                   Save
                </SaveIcon>
            </Button>

        </div>
    )
}

export const EditorNameInput=({ workflowId}:{workflowId:string})=>{
    const {data:workflow}=useSuspenseWorkflows(workflowId)
    const updateWorkflow=useUpdateWorkflowName()
    const [name, setName]=useState(workflow.name)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef=useRef<HTMLInputElement>(null)

    const handleSave = async () => {
        if (name && name !== workflow.name) {
            try {
                await updateWorkflow.mutateAsync({ id: workflowId, name });
            } catch (error) {
                console.error("Failed to update workflow name", error);
                setName(workflow.name);
            }
        }
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSave();
                    }
                    if (e.key === 'Escape') {
                        setName(workflow.name);
                        setIsEditing(false);
                    }
                }}
                className="w-full"
            />
        )
    }

    return (
        <BreadcrumbItem 
            className='cursor-pointer hover:text-foreground transition-colors'
            onClick={() => setIsEditing(true)}
        >
            {workflow.name}
        </BreadcrumbItem>
    )
}


export const EditorBreadCrumbs=({workflowId}:{workflowId:string})=>{
    

    return(
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem >
          <BreadcrumbLink asChild>
          <Link prefetch href="/workflows">
            Workflows
          </Link>
          </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <EditorNameInput
          workflowId={workflowId}
          />
        </BreadcrumbList>
        </Breadcrumb>
    )
}

export function EditorHeader({workflowId}:{workflowId:string}) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-end p-4">
     
      <SidebarTrigger/>
      <div className='flex flex-row items-center justfy-between gap-x-4 w-full mr-2'>
           <EditorBreadCrumbs workflowId={workflowId}/>
           <EditorSaveButton workflowId={workflowId}/>

      </div>
       <Button
        variant="outline"
        
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        
      </Button>

    </header>
  )
}