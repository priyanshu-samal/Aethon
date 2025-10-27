import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const page = async () => {
  await requireAuth()
  const data= await caller.getUsers()
  return (
    <div >
         {JSON.stringify(data)}
          
    </div>
  )
}

export default page