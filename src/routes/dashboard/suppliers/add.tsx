import { useCreateSupplier } from '@/services/suppliers-service'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/dashboard/suppliers/add')({
  component: AddPaymentMethod,
})

function AddPaymentMethod() {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { mutate: createSupplier } = useCreateSupplier()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    createSupplier(name, {
      onSuccess: () => {
        navigate({
          to: '/dashboard/suppliers',
        })
      },
    })
  }

  return (
    <div className="px-40 py-6 flex flex-col gap-6">
      <Heading className="text-3xl">Add Shipping Method Page</Heading>

      <form className="add-something-form space-y-3" onSubmit={handleSubmit}>
        {/* name: text */}
        <div className="flex flex-col">
          <label htmlFor="name">Supplier Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* submit buuton */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  )
}
