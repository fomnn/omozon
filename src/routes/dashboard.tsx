import DashboardNav from '@/components/dashboard-nav'
import { useVerifyToken2 } from '@/services/auth-service'
import { authStore } from '@/stores/auth'
import { Icon } from '@iconify/react'
import { Box, Popover, Switch } from '@radix-ui/themes'
import { createFileRoute, Link, Outlet, redirect, Router, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: async () => {
    const token = localStorage.getItem('token')
    const storedAdminId = authStore.state.admin_id

    if (!token) {
      throw redirect({ to: '/auth/login' })
    }

    if (!storedAdminId) {
      console.log('verifying token')
      const isTokenVerified = await useVerifyToken2(token)
      if (!isTokenVerified || !storedAdminId) {
        throw redirect({ to: '/auth/login' })
      }
    }

  },

})



function DashboardLayout() {
  return (
    <div className="w-full h-screen flex">
      <DashboardNav />
      <div className="w-10/12 py-8 pl-8 pr-8 bg-zinc-100 dark:bg-zinc-900 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}
