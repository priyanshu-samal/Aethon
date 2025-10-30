"use client"

import{
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import {authClient} from "@/lib/auth-client"

interface upgradeModelProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    
}

export const UpgradeModel=({open,onOpenChange   }
:upgradeModelProps)=>{
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Upgrade your plan</AlertDialogTitle>
      <AlertDialogDescription>
        To access this feature, please upgrade to a premium plan.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>
        authClient.checkout({slug:"omen-sandbox"})
      }>Upgrade</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )
}
