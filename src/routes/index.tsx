import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  beforeLoad: () => {
    throw redirect({
      to: '/dashboard/products',
    })
  },
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Dashboard!</h3>
    </div>
  )
}
