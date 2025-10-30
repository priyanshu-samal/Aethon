
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';


export const appRouter = createTRPCRouter({
  
  testAi: premiumProcedure.mutation(async()=>{
    await inngest.send({
      name:"execute/ai",


    })
    return{success:true, message:"AI Execution Triggered"}
  }),


  getWorkflow: protectedProcedure
    .query(({ ctx }) => {
      return prisma.workflow.findMany()
    }),
  createWorkflow: protectedProcedure.mutation(async()=>{
    await inngest.send({
      name:"test/hello.world",
      data:{
        email:"test@example.com"
      }

    })

    return prisma.workflow.create({
      data:{name:"New Workflow"}
    })
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;