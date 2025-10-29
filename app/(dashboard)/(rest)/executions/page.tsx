import React from 'react'
import page from '../executions/page'
import { requireAuth } from '@/lib/auth-utils'

const Page = async() => {
  await requireAuth()
    return (
    <div>execution</div>
  )
}

export default Page;