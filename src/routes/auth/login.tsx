import { useLogin } from '@/services/auth-service'
import { Icon } from '@iconify/react'
import { Button, Callout, Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  const { mutate: login } = useLogin()
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login(loginForm, {
      onSuccess: ({ token, id }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('admin_id', id.toString())
        navigate({
          to: '/',
        })
      },
    })
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="space-y-4">
        <Heading>Login</Heading>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <label className="flex items-center gap-2">
            Username
            <input type="text" required value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} className="border rounded px-2 py-0.5" />
          </label>

          <label className="flex items-center gap-2">
            Password
            <input type="password" required value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="border rounded px-2 py-0.5" />
          </label>
          <Button type="submit">Login</Button>
          <Callout.Root>
            <Callout.Icon>
              <Icon icon="solar:info-circle-line-duotone" />
            </Callout.Icon>
            <Callout.Text>
              <p>username: admin</p>
              <p>password: admin</p>
            </Callout.Text>
          </Callout.Root>
        </form>
      </div>
    </div>
  )
}
