import { EditorHeader } from "@/features/editor/components/editor-header";
import { Editor, EditorError, EditorLoading } from "@/features/editor/components/page";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps{
    params: Promise<{
        workflowId: string
    }>
}

const page = async ({params}: PageProps) => {
    await requireAuth()
  const {workflowId} = await params;
  prefetchWorkflow(workflowId)
  return (
    <HydrateClient>
          <ErrorBoundary fallback={<EditorError/>}>
          <Suspense fallback={<EditorLoading/>}  >
          <EditorHeader workflowId={workflowId}/>
          <main className="flex-1">
            <Editor workflowId={workflowId}/>
          </main>
          <Editor 
          workflowId={workflowId}
          />
          </Suspense>
          </ErrorBoundary>
    </HydrateClient>


  )
}

export default page