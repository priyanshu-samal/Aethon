"use client"

import { Node, NodeProps, NodeTypes, useReactFlow } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { BaseExecutionNode } from "@/features/executions/base-execution"
import { HttpRequestDialog } from "./http-request/dialog"


type HttpRequestNodeData={
    endpoint?: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: string
    [key: string]: unknown
}
type HttpRequestNodeType=Node< HttpRequestNodeData>

export const HttpRequestNode =memo ((props : NodeProps<HttpRequestNodeType>) => {
  const { setNodes } = useReactFlow()
  const [dialogOpen, setDialogOpen]=useState(false)
   const nodeStatus="success"

   const handleOpenSetting=()=> setDialogOpen(true)

  const nodeData=props.data

  const handleSubmit = (values: { endpoint: string; method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: string | undefined; }) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };

    const description= nodeData?.endpoint
      ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
      : "Not Configured"


      return(
        <>
        <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
        />
        <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onSetting={handleOpenSetting}
        onDoubleClick={handleOpenSetting}
        />

        </>
      )

})

HttpRequestNode.displayName="HttpRequestNode"