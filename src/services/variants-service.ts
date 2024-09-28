import type { Variant } from '@/types/variant'
import apiFetch from '@/lib/ofetch'
import { useQuery } from '@tanstack/react-query'

export function useGetAllVariantsWithProductName() {
  return useQuery<(Variant & {
    products: { name: string }
    variant_images: {
      file_name: string
    }[]
  })[]>({
    queryKey: ['variants'],
    queryFn: async () => {
      return await apiFetch('/variants?show-product-name=true')
    },
  })
}

export function useGetVariantsByProductId(productId: number) {
  return useQuery<(Variant & {
    variant_images: {
      file_name: string
    }[]
  })[]>({
    queryKey: ['variants', productId],
    queryFn: async () => {
      return await apiFetch(`/variants?product-id=${productId}`)
    },
  })
}
