import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllPaymentMethods() {
  return useQuery<{
    id: number
    provider: string
    transaction_fee: number
    status: boolean | null
  }[]>({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      return await apiFetch('/payment_methods')
    },
  })
}

export function useCreatePaymentMethod() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ provider, transaction_fee }: { provider: string, transaction_fee: number }) => {
      return await apiFetch('/payment_methods', {
        method: 'POST',
        body: {
          provider,
          transaction_fee,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
    }
  })
}
