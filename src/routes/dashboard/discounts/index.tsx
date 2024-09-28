import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/discounts/')({
  component: DiscountsPage,
})

function DiscountsPage() {
  return (
    <div className="p-2">
      <h3>Discounts!</h3>
    </div>
  )
}
