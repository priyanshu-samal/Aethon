import Image from "next/image"
import Link from "next/link"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return(
        <div className='bg-muted flex min-h-svh flex-col justify-center gap-6 p-6 md:p-10 items-center'>
        <div className='flex w-full max-w-sm flex-col gap-6'> 
          <Link className='flex items-center gap-2' href='/'>
          <Image src="public/Aethon-.png" alt="Aethon Logo" width={30} height={30}/>
          </Link>
          {children}
        </div>
    </div>
    )
}