"use client"

import { Position, type NodeProps } from "@xyflow/react"
import { LucideIcon } from "lucide-react"
import { memo, type ReactNode } from "react"
import { WorkflowNode } from "@/components/workflow-node"
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node"
import Image from "next/image"
import { BaseHandle } from "@/components/base-handle"


interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon | string
    name: string
    description?: string
    children?: ReactNode
    //status?:NodeStatus
    onSetting?: () => void
    onDoubleClick?: () => void
}

export const BaseTriggerNode = memo(
    function BaseTriggerNode({
        name,
        description,
        onSetting,
        onDoubleClick,
        icon: IconComponent,
        children
    }: BaseTriggerNodeProps) {
        const handleDelete = () => {
            
        }
        return (
            <WorkflowNode
                name={name}
                description={description}
                onDelete={handleDelete}
                onSetting={onSetting}

            >
                <BaseNode
                onDoubleClick={onDoubleClick}
                className="rounded-l-2xl relative group"
                >
                    <BaseNodeContent>
                        {typeof IconComponent ==="string"? (
                            <Image src={IconComponent} alt={name} width={16} height={16}/>
                        ):(
                          <IconComponent className="size-4 text-muted-foreground "/>
                        )}
                        {children}
                        
                        <BaseHandle
                        id="source-1"
                        type="source"
                        position={Position.Right}
                        />
                    </BaseNodeContent>
                
                </BaseNode>

            </WorkflowNode>
        )
    },
)

BaseTriggerNode.displayName="BaseTriggerNode"