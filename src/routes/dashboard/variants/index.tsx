import { baseImagesURL } from '@/lib/ofetch'
import { useGetAllVariantsWithProductName } from '@/services/variants-service'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/variants/')({
  component: VariantsPage,
})

function VariantsPage() {
  const { data: variants } = useGetAllVariantsWithProductName()

  return (
    <div className=" flex flex-col gap-6">
      <Heading>Variants</Heading>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Variant</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>SKU</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Discounted Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Stock Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Material</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Images</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {variants?.map(variant => (
            <Table.Row key={variant.id}>
              <Table.RowHeaderCell>{variant.name}</Table.RowHeaderCell>
              <Table.Cell>{variant.products.name}</Table.Cell>
              <Table.Cell>{variant.sku}</Table.Cell>
              <Table.Cell>{variant.price}</Table.Cell>
              <Table.Cell>{variant.discounted_price}</Table.Cell>
              <Table.Cell>{variant.stock_quantity}</Table.Cell>
              <Table.Cell>{variant.weight}</Table.Cell>
              <Table.Cell>{variant.material}</Table.Cell>
              <Table.Cell>
                <div className="grid grid-cols-4">
                  {variant.variant_images.map((variantImage, i) => (
                    <img
                      src={`${baseImagesURL}/images/variant_images/${variantImage.file_name}`}
                      alt=""
                      key={i}
                      className="size-12 overflow-hidden object-cover"
                    />
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
