import { LoginForm } from '@/features/auth/components/login-form'
import { requireUnAuth } from '@/lib/auth-utils'


const page = async () => {
  await requireUnAuth()
    return (
    <div>
        <LoginForm />
    </div>
  )
}

export default page