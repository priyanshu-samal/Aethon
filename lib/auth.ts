import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma,{
    provider:"postgresql"
  }),
  emailAndPassword:{
    enabled:true,
    autoSignIn:true,
  },
  plugins:[
    polar({
      client:polarClient,
      createCustomerOnSignUp: true,
      use:[
        checkout({
          products:[
            {
              productId:"3fa84f42-5fb3-4693-a077-cb0726b3d6d4",
              slug:"omen-sandbox",
            }
          ],
          successUrl: "http://localhost:3000",
          authenticatedUsersOnly:true,
        }),
        portal()
      ]
    })
  ]
});