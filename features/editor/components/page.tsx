"use client"

import { ErrorView, LoadingView } from "@/components/entity-components"
import { useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflow"
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge,type Node,type Edge, NodeChange, EdgeChange, Connection, Background, Controls, MiniMap, Panel } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";
import { useSetAtom } from "jotai";
import { editorAtom } from "../store/atoms";



export const EditorLoading=()=>{
    return<LoadingView message="Loading editor..."/>
}

export const EditorError=()=>{
    return<ErrorView message="Loading editor..."/>
}



export const Editor=({workflowId}:{workflowId: string})=>{
    const {data:workflow}=useSuspenseWorkflows(workflowId)
    

    const setEditor= useSetAtom(editorAtom)


    const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
    const [edges, setEdges] = useState<Edge[]>(workflow.edges);
       
    const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes:EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params:Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

    return(
        <div className="size-full text-black">
            <ReactFlow
        onInit={setEditor}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        fitView
        //snapGrid={[10,10]}
        //snapToGrid
        //panOnScroll
        //panOnDrag={false}
        //selectionOnDrag
        proOptions={{
            hideAttribution:true
        }}
      >
       <Background/>
       <Controls/>
       <MiniMap 
       nodeColor="#a1a1aa"
       maskColor="#00000050"
       style={{
        backgroundColor:"#00000050",
        
       }}
       />
       <Panel position="top-right">
        <AddNodeButton/>
       </Panel>
      </ReactFlow>

        </div>
    )
}