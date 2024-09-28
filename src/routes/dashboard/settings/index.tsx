import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="p-2">
      <h3>Settings! [later]</h3>
    </div>
  )
}
