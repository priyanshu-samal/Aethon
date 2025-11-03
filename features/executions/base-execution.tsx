"use client"

import { Position, useReactFlow, type NodeProps } from "@xyflow/react"
import { LucideIcon } from "lucide-react"
import { memo, type ReactNode } from "react"
import { WorkflowNode } from "../../components/workflow-node"
import { BaseNode, BaseNodeContent } from "../../components/react-flow/base-node"
import Image from "next/image"
import { BaseHandle } from "../../components/base-handle"
import { type NodeStatus, NodeStatusIndicator } from "@/components/react-flow/node-status-indicator"
import { NodeSelector } from "@/components/node-selector"


interface BaseExecutionNodeProps extends NodeProps {
    icon: LucideIcon | string
    name: string
    description?: string
    children?: ReactNode
    status?:NodeStatus
    onSetting?: () => void
    onDoubleClick?: () => void
}

export const BaseExecutionNode = memo(
    function BaseExecutionNode({
        id,
        name,
        description,
        onSetting,
        onDoubleClick,
        icon: IconComponent,
        children,
        status="initial"
    }: BaseExecutionNodeProps) {
         const {setNodes, setEdges}= useReactFlow()
                const handleDelete = () => {
                    setNodes((currentNodes)=>{
                        const updatedNodes=currentNodes.filter((node)=>node.id !==id)
                        return updatedNodes
        
                    })
                    setEdges((currentEdges)=>{
                        const updateEdges= currentEdges.filter(
                            (edge)=>edge.source !==id && edge.target !==id
                        )
                        return updateEdges
                    })
                }
        return (
            <WorkflowNode
                name={name}
                description={description}
                onDelete={handleDelete}
                onSetting={onSetting}

            >
                <NodeStatusIndicator 
                status={status}
                variant="border"
                >
                <BaseNode status={status}
                onDoubleClick={onDoubleClick}
                >
                    <BaseNodeContent>
                        {typeof IconComponent ==="string"? (
                            <Image src={IconComponent} alt={name} width={16} height={16}/>
                        ):(
                          <IconComponent className="size-4 text-muted-foreground "/>
                        )}
                        {children}
                        <BaseHandle
                        id="target-1"
                        type="target"
                        position={Position.Left}
                        />
                        <BaseHandle
                        id="source-1"
                        type="source"
                        position={Position.Right}
                        />
                    </BaseNodeContent>
                
                </BaseNode>
                </NodeStatusIndicator>

            </WorkflowNode>
        )
    },
)
