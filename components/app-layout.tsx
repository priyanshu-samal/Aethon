'use client'

import { usePathname } from 'next/navigation'
import { AppHeader } from './app-header'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEditorPage = pathname.includes('/workflows/') && pathname.split('/').length > 2

  return (
    <>
      {!isEditorPage && <AppHeader />}
      {children}
    </>
  )
}