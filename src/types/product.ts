export interface Product {
  id: number
  name: string
  long_desc: string
  short_desc: string | null
  category_id: number
  category_id_2: number | null
  category_id_3: number | null
  status: boolean | null
  supplier_id: number
}
