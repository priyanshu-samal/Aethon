"use client"


import {createId} from "@paralleldrive/cuid2"
import { useReactFlow } from "@xyflow/react"
import{
    GlobeIcon,
    MousePointerIcon
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"


import { NodeType } from "@/generated/browser";
import {Separator} from "./ui/separator"
import React, { useCallback } from "react"
import { toast } from "sonner";
import Image from "next/image";

export type NodeTypeOption={
    type: NodeType
    label: string
    description:string
    icon:React.ComponentType<{className?: string}> | string


}

const triggerNodes: NodeTypeOption[]=[
    {
    type:NodeType.MANUAL_TRIGGER,
    label:"Triger manually",
    description:"Runs the flow by clicking the button",
    icon:MousePointerIcon
    }
]

const executionNodes:NodeTypeOption[]=[
    {
    type: NodeType.HTTP_REQUEST,
    label:"HTTP Request",
    description:"Makes an HTTP request to a URL",
    icon:GlobeIcon
    }
]

interface NodeSelectorProps{
    open:boolean
    onOpenChange:(open: boolean)=>void
    children:React.ReactNode
}

export function NodeSelector({
    open,
    onOpenChange,
    children
}:NodeSelectorProps){
    const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

    const handleNodesSelector = useCallback(
      (selection: NodeTypeOption) => {
        if (selection.type === NodeType.MANUAL_TRIGGER) {
          const nodes = getNodes();
          const hasManualTrigger = nodes.some(
            (node) => node.type === NodeType.MANUAL_TRIGGER,
          );
          if (hasManualTrigger) {
            toast.error("Only one manual triger allowed ");
            return;
          }
        }
        setNodes((nodes) => {
          const hasInitialTrigger = nodes.some(
            (node) => node.type === NodeType.INITIAL,
          );
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
          });

          const newNode = {
            id: createId(),
            type: selection.type,
            position: flowPosition,
            data: {
              label: selection.label,
            },
          };

          onOpenChange(false);

          if (hasInitialTrigger) {
            const initialNode = nodes.find(
              (node) => node.type === NodeType.INITIAL,
            );
            if (initialNode) {
              return [...nodes.filter((n) => n.id !== initialNode.id), newNode];
            }
          }

          return [...nodes, newNode];
        });
      },
      [getNodes, onOpenChange, screenToFlowPosition, setNodes],
    );
 

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
               {children}
            </SheetTrigger>
             <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>

             What triggers this workflow?
            <SheetTitle>

            </SheetTitle>
           
              <SheetDescription className="">
                A trigger is a step that starts your workflow
              </SheetDescription>
              </SheetHeader>
              <div>
                {triggerNodes.map((nodeType) => {
                  const Icon = nodeType.icon;

                  return (
                    <div
                      key={nodeType.type}
                      className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-1-2 border-transparent hover:border-l-primary"
                      onClick={() => handleNodesSelector(nodeType)}
                    >
                      <div className="flex items-center gap-6 w-full overflow-hidden ">
                        {typeof Icon === "string" ? (
                          <img
                            src={Icon}
                            alt={nodeType.label}
                            className="size-5 object-contain rounded-sm"
                          />
                        ) : (
                          <Icon className="size-5" />
                        )}
                        <div className="flex flex-col items-start text-left ">
                          <span className="font-medium text-sm">
                            {nodeType.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator/>
              <div>
                {executionNodes.map((nodeType) => {
                  const Icon = nodeType.icon;

                  return (
                    <div
                      key={nodeType.type}
                      className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-1-2 border-transparent hover:border-l-primary"
                      onClick={() => handleNodesSelector(nodeType)}
                    >
                      <div className="flex items-center gap-6 w-full overflow-hidden ">
                        {typeof Icon === "string" ? (
                          <img
                            src={Icon}
                            alt={nodeType.label}
                            className="size-5 object-contain rounded-sm"
                          />
                        ) : (
                          <Icon className="size-5" />
                        )}
                        <div className="flex flex-col items-start text-left ">
                          <span className="font-medium text-sm">
                            {nodeType.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SheetContent>
        </Sheet>
    )
}