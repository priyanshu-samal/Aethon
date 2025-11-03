import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode= memo((props: NodeProps)=>{
  const [dialogOpen, setDialogOpen]=useState(false)
  
  const nodeStatus="loading"

  const handleOpenSettings=()=> setDialogOpen(true)
  
  return (
   <>
    <ManualTriggerDialog
   open={dialogOpen}
   onOpenChange={setDialogOpen}
   onSubmit={()=>{}}
   />
   <BaseTriggerNode
   {...props}
   icon={MousePointerIcon}
   name="When clicking 'Executes workflow'"
   status={nodeStatus}
   onSetting={handleOpenSettings}
   onDoubleClick={handleOpenSettings}

   />
  
   </>
)
})

ManualTriggerNode.displayName = 'ManualTriggerNode';