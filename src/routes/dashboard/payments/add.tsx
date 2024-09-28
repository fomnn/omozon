import { useCreatePaymentMethod } from '@/services/payment-methods-service'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/dashboard/payments/add')({
  component: AddPaymentMethod,
})

function AddPaymentMethod() {
  const { mutate: createPaymentMethod } = useCreatePaymentMethod()
  const [provider, setProvider] = useState('')
  const [transactionFee, setTransactionFee] = useState(0)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    createPaymentMethod(
      {
        provider,
        transaction_fee: transactionFee,
      },
      {
        onSuccess: () => {
          navigate({
            to: '/dashboard/payments',
          })
        },
      },
    )
  }

  return (
    <div className="px-40 py-6 space-y-6">
      <Heading className="text-3xl">Add Shipping Method Page</Heading>

      <form className="add-something-form space-y-6" onSubmit={handleSubmit}>
        {/* name: text */}
        <div className="flex flex-col">
          <label htmlFor="name">Shipping Method Name</label>
          <input
            onChange={(e) => setProvider(e.target.value)}
            type="text"
            id="name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="transaction_fee">
            Transaction Fee (in percentage)
          </label>
          <input
            onChange={(e) =>
              setTransactionFee(Number.parseFloat(e.target.value))
            }
            type="number"
            step="0.01"
            min="0"
            id="transaction_fee"
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
