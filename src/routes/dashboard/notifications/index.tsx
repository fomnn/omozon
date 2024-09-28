import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/notifications/')({
  component: NotificationsPage,
})

function NotificationsPage() {
  return (
    <div className="p-2">
      <h3>Notifications! [later]</h3>
    </div>
  )
}
