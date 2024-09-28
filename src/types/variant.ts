export interface Variant {
  id: number
  product_id: number
  name: string
  sku: string | null
  price: number
  discounted_price: number | null
  stock_quantity: number
  weight: number | null
  material: string | null
}
