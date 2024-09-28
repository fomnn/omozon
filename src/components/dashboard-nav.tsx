import { authStore } from '@/stores/auth'
import { Icon } from '@iconify/react'
import { Box, Popover, Switch } from '@radix-ui/themes'
import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function DashboardNav() {
  const navigate = useNavigate()

  const [darkmode, setDarkmode] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('admin_id')
    authStore.setState(() => ({
      admin_id: null,
    }))
    navigate({
      to: '/auth/login',
    })
  }

  function handleChangeDarkmode(darkmode: boolean) {
    if (darkmode) {
      setDarkmode(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkmode', 'true')
    } else {
      setDarkmode(false)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkmode', 'false')
    }
  }

  useEffect(() => {
    const darkmode = localStorage.getItem('darkmode')
    if (darkmode === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])
  return (
    <nav className="w-2/12 py-5 flex flex-col justify-between">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center gap-2 justify-center py-3">
          <Icon icon="material-symbols:shopping-cart" className="text-3xl text-sky-600" />
          <span className="font-semibold">
            Admin Omozon
          </span>
        </div>
        <div className="flex flex-col gap-2 px-3">
          {/* <Link
            to="/"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
            activeOptions={{ exact: true }}
          >
            <Icon icon="solar:home-2-outline" />
            Home
          </Link> */}
          {' '}
          <Link
            to="/dashboard/products"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="solar:archive-linear" />
            Products
          </Link>
          {/* <Link
            to="/variants"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="solar:server-square-linear" />
            Variants
          </Link> */}
          <Link
            to="/dashboard/inventory"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="solar:backpack-linear" />
            Inventory
          </Link>
          <Link
            to="/dashboard/categories"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="material-symbols-light:category-outline-rounded" />
            Categories
          </Link>
          <Link
            to="/dashboard/shipping"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="hugeicons:delivery-truck-02" />
            Shipping
          </Link>
          <Link
            to="/dashboard/payments"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="solar:wallet-money-outline" />
            Payments
          </Link>
          <Link
            to="/dashboard/suppliers"
            activeProps={{
              className: 'bg-slate-100 dark:bg-zinc-800 shadow',
            }}
            className="flex items-center gap-2 px-2 py-1 rounded-sm transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          >
            <Icon icon="material-symbols-light:warehouse-outline-rounded" />
            Suppliers
          </Link>
        </div>

      </div>
      <div className="flex flex-col gap-2 px-3">
        <Popover.Root>
          <Popover.Trigger>
            <button
              type="button"
              className="flex bg-zinc-50 dark:bg-zinc-800 items-center gap-2 px-2 py-1 rounded-md transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
            >
              <Icon icon="solar:settings-line-duotone" />
              Settings
            </button>
          </Popover.Trigger>
          <Popover.Content>
            <Box>
              <div className="flex items-center gap-2 w-full justify-between">
                <label>Dark Mode</label>
                <Switch checked={darkmode} onCheckedChange={handleChangeDarkmode} />
              </div>
            </Box>
          </Popover.Content>
        </Popover.Root>
        <button
          type="button"
          className="flex bg-zinc-50 dark:bg-zinc-800 items-center gap-2 px-2 py-1 rounded-md transition-all duration-75 hover:bg-slate-50 dark:hover:bg-zinc-900"
          onClick={handleLogout}
        >
          <Icon icon="solar:login-outline" />
          Log out
        </button>
      </div>
    </nav>
  )
}
