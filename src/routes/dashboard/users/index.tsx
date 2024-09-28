import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="p-2">
      <h3>Users!</h3>
    </div>
  )
}
