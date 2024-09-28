import ProductVariantCard from '@/components/cards/product-variant-card'
import { useGetAllProducts } from '@/services/products-service'
import { Icon } from '@iconify/react'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const [showVariant, setShowVariant] = useState(false)
  const [productIdVariant, setProductIdVariant] = useState(0)

  const { data: products } = useGetAllProducts()
  return (
    <div className="flex gap-6 overflow-hidden">
      <div
        className={clsx('flex flex-col gap-6 transition-all duration-300', {
          'w-full': !showVariant,
          'w-4/6': showVariant,
        })}
      >
        <div className="flex justify-between">
          <Heading>Products</Heading>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/products/add">
              <Button>Add Product</Button>
            </Link>
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Long Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Short Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map(product => (
              <Table.Row key={product.id}>
                <Table.RowHeaderCell>{product.name}</Table.RowHeaderCell>
                <Table.Cell>{product.long_desc}</Table.Cell>
                <Table.Cell>{product.short_desc}</Table.Cell>
                <Table.Cell>
                  {product.status ? 'active' : 'inactive'}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-4 justify-end">
                    <Button
                      variant="soft"
                      color="gray"
                      onClick={() => {
                        setShowVariant(true)
                        setProductIdVariant(product.id)
                      }}
                    >
                      Show Variants
                    </Button>
                    <button type="button" className='hover:bg-zinc-300 size-8 flex items-center justify-center rounded-full transition-colors duration-300'>
                      <Icon icon="solar:menu-dots-bold" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
      <ProductVariantCard
        productIdVariant={productIdVariant}
        clodeVariantCard={() => setShowVariant(false)}
        showVariantCard={showVariant}
      />
      {/* <div className={clsx(
        'bg-white rounded-md p-4 transition-all duration-300',
        {
          'w-0 translate-x-[100%]': !showVariant,
          'block w-2/6': showVariant,
        },
      )}
      >
        Coming Soon
      </div> */}
    </div>
  )
}
