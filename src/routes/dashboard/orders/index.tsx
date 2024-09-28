import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/orders/')({
  component: OrdersPage,
})

function OrdersPage() {
  return (
    <div className="p-2">
      <h3>Orders!</h3>
    </div>
  )
}
