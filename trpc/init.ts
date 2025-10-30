import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { initTRPC, TRPCError } from '@trpc/server';
import next from 'next';
import { headers } from 'next/headers';
import { cache } from 'react';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({
  ctx,
  next
}) => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource'
    });
  }
  return next({
    ctx: {
      ...ctx, auth: session
    }
  });
});

export const premiumProcedure= protectedProcedure.use(
  async({ctx, next})=>{
    let customer;
    try {
      customer = await polarClient.customers.getStateExternal({
        externalId:ctx.auth.user.id,
      });
    } catch (error: any) { // Use 'any' for now to inspect the error object
      // Check if the error message or response indicates a "ResourceNotFound"
      const isResourceNotFound = 
        (error.message && error.message.includes("ResourceNotFound")) ||
        (error.response && error.response.status === 404) || // Assuming 404 for Not Found
        (error.response && error.response.data && error.response.data.error === "ResourceNotFound");

      if (isResourceNotFound) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must have an active subscription to access this resource",
        });
      }
      // If it's a different error, re-throw it as a generic internal server error
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while checking your subscription. Please try again later or contact support.",
      });
    }

    if(
      !customer.activeSubscriptions ||
      customer.activeSubscriptions.length ===0
    ){
      throw new TRPCError({
        code:"FORBIDDEN",
        message:"You must have an active subscription to access this resource"
      })
    }
    return next({ctx:{...ctx, customer} })
  }
) 