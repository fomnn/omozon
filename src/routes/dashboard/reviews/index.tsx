import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/reviews/')({
  component: ReviewsPage,
})

function ReviewsPage() {
  return (
    <div className="p-2">
      <h3>Reviews!</h3>
    </div>
  )
}
