"use client";

import { useRouter } from 'next/navigation';
import { CreditCardIcon, FolderIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarGroupContent,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem
} from '@/components/ui/sidebar'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useHasActiveSubscription } from '@/features/subscriptions/hooks/use-subscription';

const menuItems = [
  {
    title: 'Main',
    items: [
      {
        title: 'Workflows',
        icon: FolderIcon,
        url: '/workflows'
      },
      {
        title: 'Credentials',
        icon: KeyIcon,
        url: '/credentials'
      },
      {
        title: 'Executions',
        icon: HistoryIcon,
        url: '/executions'
      }
    ]
  }
]

export const AppSidebar = () => {

    const router=useRouter();
    const pathname=usePathname();
    const {hasActiveSubscription, isLoading}=useHasActiveSubscription()



  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className='gap-x-4 h-10 px-4'>
                    <Link prefetch href="/">
                    <Image src='/Aethon_transparent-.png' alt='Aethon Logo' width={40} height={40}/>

                    Aethon
                    </Link>

                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
                <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={
                        item.url === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.url)
                    }
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url} prefetch>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                  {!hasActiveSubscription && !isLoading &&(
                    <SidebarMenuItem>
                    <SidebarMenuButton
                    tooltip="Upgrade to Pro"
                    className='gap-x-4 h-10 px-4'
                    onClick={()=>{
                      authClient.checkout({slug:"omen-sandbox"})
                    }}
                    >
                        <StarIcon className='h-5 w-5'/>
                        <span>Upgrade to Pro</span>

                    </SidebarMenuButton>
             </SidebarMenuItem>
             )}
             <SidebarMenuItem>
              
                 <SidebarMenuButton
                     tooltip="Billing Potal"
                     className='gap-x-4 h-10 px-4'
                     onClick={()=>{
                      authClient.customer.portal()
                     }}
                 >
                     <CreditCardIcon className='h-5 w-5'/>
                     <span>Billing Portal</span>
                 </SidebarMenuButton>
             </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                     tooltip="Sign Out"
                     className='gap-x-4 h-10 px-4'
                     onClick={()=>authClient.signOut({
                        fetchOptions:{
                            onSuccess:()=>{
                                router.push('/login')
                            }
                             
                        }
                     })}

                    
                 >
                     <LogOutIcon className='h-5 w-5'/>
                     <span>Sign Out</span>
                 </SidebarMenuButton>
             </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}