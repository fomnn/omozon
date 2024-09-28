import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllShippingMethods() {
  return useQuery<{
    id: number
    option: string
    status: boolean | null
  }[]>({
    queryKey: ['shipping-methods'],
    queryFn: async () => {
      return await apiFetch('/shipping_methods')
    },
  })
}

export function useCreateShippingMethod() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (option: string) => {
      await apiFetch('/shipping_methods', {
        method: 'POST',
        body: {
          option,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-methods'] })
    }
  })
}
