import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllTags() {
  return useQuery<{
    id: number
    tag: string
  }[]>({
    queryKey: ['tags'],
    queryFn: async () => {
      return await apiFetch('/tags')
    },
  })
}
