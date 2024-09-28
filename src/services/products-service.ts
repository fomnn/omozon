import type { Product } from '@/types/product'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface CreateProduct {
  name: string
  long_desc: string
  short_desc: string
  shipping_method_ids: number[]
  supplier_id: number
  category_id: number
  category_id_2: number | null
  category_id_3: number | null
  product_tags: string[]
}

interface CreateVariant {
  name: string
  sku: string | null
  price: number
  discounted_price: number | null
  stock_quantity: number
  weight: number | null
  material: string | null
  product_images: File[] | null
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ product, variants }: { product: CreateProduct, variants: CreateVariant[] }) => {
      const formData = new FormData()

      formData.append('name', product.name)
      formData.append('long_desc', product.long_desc)
      formData.append('short_desc', product.short_desc)
      for (const shipping_method_id of product.shipping_method_ids) {
        formData.append('shipping_method_ids', shipping_method_id.toString())
      }
      formData.append('supplier_id', product.supplier_id.toString())
      formData.append('category_id', product.category_id.toString())
      if (product.category_id_2) {
        formData.append('category_id_2', product.category_id_2.toString())
      }
      if (product.category_id_3) {
        formData.append('category_id_3', product.category_id_3.toString())
      }
      for (const tag of product.product_tags) {
        formData.append('product_tags', tag)
      }

      const { id: product_id } = await apiFetch<{ id: number }>('/products', {
        method: 'POST',
        body: formData,
      })

      for (const variant of variants) {
        const variantFormdata = new FormData()
        variantFormdata.append('product_id', product_id.toString())
        variantFormdata.append('name', variant.name)
        variantFormdata.append('price', variant.price.toString())
        variantFormdata.append('stock_quantity', variant.stock_quantity.toString())
        if (variant.sku) {
          variantFormdata.append('sku', variant.sku)
        }
        if (variant.discounted_price) {
          variantFormdata.append('discounted_price', variant.discounted_price.toString())
        }
        if (variant.weight) {
          variantFormdata.append('weight', variant.weight.toString())
        }
        if (variant.material) {
          variantFormdata.append('material', variant.material.toString())
        }
        if (variant.product_images) {
          for (const img of variant.product_images) {
            variantFormdata.append('product_images', img)
          }
        }

        await apiFetch('/variants', {
          method: 'POST',
          body: variantFormdata,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })
}

export function useGetAllProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      return await apiFetch('/products')
    },
  })
}
