import { useVerifyToken2 } from '@/services/auth-service'
import { authStore } from '@/stores/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  beforeLoad: async () => {
    const { admin_id } = authStore.state
    console.log(admin_id)
    if (!localStorage.getItem('token'))
      return
    
    const isVerified = await useVerifyToken2(localStorage.getItem('token')!)
    if (isVerified) {
      throw redirect({
        to: '/'
      })
    }
  }
})

function AuthLayout() {
  return (
    <Outlet />
  )
}