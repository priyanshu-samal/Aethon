import { AlertTriangleIcon, Loader2Icon, MoreVertical, MoreVerticalIcon, PackageOpenIcon, PlusIcon, SearchIcon, Subtitles, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Input } from "./ui/input";
import{
Empty,
EmptyContent,
EmptyDescription,
EmptyHeader,
EmptyTitle,
EmptyMedia

} from "./ui/empty"
import{
 Card,
 CardContent,
 CardDescription,
 CardTitle
} from "@/components/ui/card"
import{
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"




type EntityHeaderProps={
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
    |{onNew:()=>void ; newButtonHref?:never}
    |{newButtonHref:string; onNew?:never}
    |{onNew?:never; newButtonHref?:never}

)

export const EntityHeader=({
    title,
  description,
  newButtonLabel,
    newButtonHref,
  disabled,
  isCreating,
    onNew,
}:EntityHeaderProps)=>{

    return(
        <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-sm tmd:text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

               {onNew && !newButtonHref && (
                <Button disabled={isCreating || disabled} size="sm" onClick={onNew}>
                    <PlusIcon className="size-4 "/>
                    {newButtonLabel}

                </Button>
               )}
               {onNew && !onNew && (
                <Button size="sm" asChild>
                    <Link href={newButtonHref} prefetch> 
                    <PlusIcon className="size-4 "/>
                    {newButtonLabel}
                    </Link>

                </Button>
               )}
               
        </div>
    )

}

type EntityContainerProps={
 children:React.ReactNode;
 header?:React.ReactNode;
    search?:React.ReactNode;
    pagination?:React.ReactNode;


}
export const EntityContainer=({
    children,
    header,
    search,
    pagination
}:EntityContainerProps)=>{
    return(
        <div className="p-4 md:mx-10 md:py-6 h-full"> 
        <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
            {header}
        
        <div className="flex flex-col gap-y-4 h-full">
            {search}
            {children}

        </div>
        {pagination}
            
        </div>
        </div>

    )
}

interface EntitySearchtProps{
    value:string;
    onChange:(value:string)=>void;
    placeholder?:string;

}

export const EntitySearch=({
    value,
    onChange,
    placeholder="Search..."
}:EntitySearchtProps)=>{

    return(
        <div className="relative ml-auto">
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
            <Input className="max-w-[200px] bg-background shadow-none border-border pl-8"
             placeholder={placeholder}
             value={value}
             onChange={(e)=>onChange(e.target.value)}
            />

        </div>
    )
}

interface EntityPaginationProps{
    page:number,
    onPageChange:(page:number)=> void
    disabled?:boolean,
    totalPages:number,

}

export const EntityPagination=({
    page,
    totalPages,
    onPageChange,
    disabled,
}:EntityPaginationProps)=>{
    return(
       <div className="flex items-center justify-between gap-x-2 w-full">
        <div className="flex-1 text-sm text-muted-foreground">
            Page {page} of {totalPages || 1}
        </div>

<div className="flex items-center justify-end space-x-2 py-4">
<Button disabled={page===1||disabled}
variant="outline"
size="sm"
onClick={()=>onPageChange(Math.max(1,page -1))}>
    Previous
</Button>
<Button disabled={page===totalPages||totalPages===0||disabled}
variant="outline"
size="sm"
onClick={()=>onPageChange(Math.min(totalPages, page+1))}>
    Next
</Button>
</div>
       </div>
    )
}

interface StateViewProps {
    message?:string
}

interface LoadingViewProps extends 
StateViewProps{
    entity?: string;
}


export const LoadingView=({
    
    message,
}:LoadingViewProps)=>{
    return(
        <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
            <Loader2Icon className="size-6 animate-spin text-primary"/>
            {!!(message) &&(
            <p className="text-sm text-muted-foreground">
                {message }
            </p>
            )}

        </div>
    )

}

export const ErrorView=({
    
    message,
}:StateViewProps)=>{
    return(
        <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
            <AlertTriangleIcon className="size-6  text-primary"/>
            {!!(message) &&(
            <p className="text-sm text-muted-foreground">
                {message }
            </p>
            )}

        </div>
    )

}

interface EmptyViewProps extends StateViewProps{
    onNew?:()=> void
}
export const EmptyView =({
    message,
    onNew,

}:EmptyViewProps)=>{
    return(
        <Empty className=" border border-dashed ">
           <EmptyHeader>
            <EmptyMedia variant="icon">
                <PackageOpenIcon/>
            </EmptyMedia>
           </EmptyHeader>
           <EmptyTitle>
            No items
           </EmptyTitle>
           {!!message &&(
           <EmptyDescription>
            {message}
           </EmptyDescription>
           )}
           {!!onNew && (
            <EmptyContent>
                <Button onClick={onNew}>
                    Add item
                </Button>
            </EmptyContent>
           )}
        </Empty>
    )
}




//Table below
interface EmptyStateProps extends StateViewProps {
    entity?: string;
}

export const EmptyState = ({
    entity = "items",
    message,
}: EmptyStateProps) => {
    return (
        <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
            <p className="text-sm text-muted-foreground">
                {message || `No ${entity} found.`}
            </p>
        </div>
    )
}

interface EntityTableProps {
    headers: string[];
    children: React.ReactNode;
}

import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const EntityTable = ({
    headers,
    children,
}: EntityTableProps) => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                {children}
            </Table>
        </div>
    )
}

interface EntityListProps<T>{
    items: T[]
    renderItem:(item:T, index: number, )=>React.ReactNode
    getKey?:(item:T, index: number)=> string| number 
    emptyView?: React.ReactNode
    className?:string
}

export function EntityList<T>({
    items,
    renderItem,
    getKey,
    emptyView,
    className,


}:EntityListProps <T>){
    if(items.length===0 && emptyView){
        return (
            <div className="flex-1 flex justify-center items-center">
                <div className="max-w-sm mx-auto">
                   {emptyView}

                </div>

            </div>
        )
    }
    return(
        <div className={cn(
            "flex flex-col gap-y-4",
            className,
        )}>
            {items.map((item, index)=>(
                <div key={getKey? getKey(item,index): index}>
                   {renderItem(item,index)}
                </div>
            ))}

        </div>
    )
}

interface EntityItemsProps{
    href:string
    title:string 
    subtitle?:React.ReactNode
    image?:React.ReactNode
    actions?:React.ReactNode
    onRemove?:()=> void| Promise<void>
    isRemoving?:boolean,
    className?:string
}

export const EntityItem=({
    href,
    title,
    subtitle,
    image,
    actions,
    onRemove,
    isRemoving,
    className

}:EntityItemsProps)=>{

    const handleRemove=async (e: React.MouseEvent)=>{
        e.preventDefault()
        e.stopPropagation()

        if(isRemoving){
            return 
        }
        if(onRemove){
            await onRemove()
        }
    }

         return(
            <Link href={href}>
              <Card
              className={cn(
                "p-4 shadow-none hover:shadow cursor-pointer",
                isRemoving && "opacity-50 cursor-not-allowed",
                className,
              )}
              >
                <CardContent className="flex flex-row items-center justify-between p-0">
                   <div className="flex items-center gap-3">
                       {image}
                       <div>
                        <CardTitle className="text-base font-medium">
                         {title}
                        </CardTitle>
                        {!!subtitle && (
                            <CardDescription className="text-xs">
                                {subtitle}
                            </CardDescription>
                        )}
                       </div>
                   </div>
                   {(actions || onRemove)&&(
                    <div className="flex gap-4 items-center">
                        {actions}
                        {onRemove &&(
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                       <Button
                                       size="icon"
                                       variant="ghost"
                                       onClick={(e)=>e.stopPropagation()}
                                       >
                                        <MoreVerticalIcon className="size-4"/>

                                       </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                align="end"
                                onClick={(e)=>e.stopPropagation()}
                                >
                                         <DropdownMenuItem onClick={handleRemove}>
                                            <TrashIcon className="size-4">
                                                Delete
                                            </TrashIcon>
                                         </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                   )}
                </CardContent>

              </Card>
            </Link>
         )
}

