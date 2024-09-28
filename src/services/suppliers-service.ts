import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllSuppliers() {
  return useQuery<{
    id: number
    name: string | null
  }[]>({
    queryKey: ['suppliers'],
    queryFn: async () => {
      return await apiFetch('/suppliers')
    },
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (name: string) => {
      await apiFetch('/suppliers', {
        method: 'POST',
        body: {
          name,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })
}
