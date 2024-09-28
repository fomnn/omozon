import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiFetch from '../lib/ofetch'

export function useGetAllCategories() {
  return useQuery<{
    description: string
    id: number
    name: string
    slug: string
    category_parent_id: number | null
  }[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/categories')
      return res
    },
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { name: string, description: string, category_parent_id?: number }) => {
      return await apiFetch('/categories', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
