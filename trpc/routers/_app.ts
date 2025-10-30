
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { Workflow } from 'lucide-react';
import { workflowsRouter } from '@/features/workflows/server/router';


export const appRouter = createTRPCRouter({
  
  Workflow:workflowsRouter,
  
});
// export type definition of API
export type AppRouter = typeof appRouter;