import { useCreateShippingMethod } from '@/services/shipping-methods-service'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/dashboard/shipping/add')({
  component: AddShipping,
})

function AddShipping() {
  const [shippingMethod, setShippingMethod] = useState('')
  const { mutate: createShippingMethod } = useCreateShippingMethod()
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createShippingMethod(shippingMethod, {
      onSuccess: () => {
        navigate({
          to: '/dashboard/shipping',
        })
      },
    })
  }

  return (
    <div className="px-40 py-6 flex flex-col gap-6">
      <Heading className="text-3xl">Add Shipping Method Page</Heading>

      <form className="add-something-form space-y-6" onSubmit={handleSubmit}>
        {/* name: text */}
        <div className="flex flex-col">
          <label htmlFor="name">Shipping Method Name</label>
          <input
            onChange={(e) => setShippingMethod(e.target.value)}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        {/* submit buuton */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Shipping Method
          </button>
        </div>
      </form>
    </div>
  )
}
