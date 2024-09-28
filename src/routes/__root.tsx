import { useVerifyToken } from '@/services/auth-service'
import { authStore } from '@/stores/auth'
import { Icon } from '@iconify/react'
import { Box, Button, Card, Popover, Switch } from '@radix-ui/themes'
import { createRootRoute, Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
