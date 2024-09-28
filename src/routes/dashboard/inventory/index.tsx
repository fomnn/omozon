import { baseImagesURL } from '@/lib/ofetch'
import { useGetAllVariantsWithProductName } from '@/services/variants-service'
import { Icon } from '@iconify/react'
import { Heading, Table } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/inventory/')({
  component: InventoryPage,
})

function InventoryPage() {
  const { data: variants } = useGetAllVariantsWithProductName()

  return (
    <div className=" flex flex-col gap-6">
      <Heading>Inventory</Heading>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Images</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Variant</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Stock Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {variants?.map((variant) => (
            <Table.Row key={variant.id}>
              <Table.Cell className="w-36">
                <div className="grid grid-cols-3 gap-1 w-36">
                  {variant.variant_images.slice(0, 3).map((image) => (
                    <img
                      src={`${baseImagesURL}/images/variants/${image.file_name}`}
                      key={image.file_name}
                      alt=""
                      className="size-12 overflow-hidden object-cover"
                    />
                  ))}
                </div>
                {/* <img src={`${baseURL}/images/variant_images/${variant.variant_images[0].file_name}`} alt="" className="size-12 overflow-hidden object-cover" /> */}
              </Table.Cell>
              <Table.RowHeaderCell>{variant.products.name}</Table.RowHeaderCell>
              <Table.Cell>{variant.name}</Table.Cell>
              <Table.Cell>{variant.stock_quantity}</Table.Cell>
              <Table.Cell>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" className="">
                    <Icon
                      icon="solar:add-square-bold-duotone"
                      className="text-4xl text-green-500"
                    />
                  </button>
                  <button type="button" className="">
                    <Icon
                      icon="solar:minus-square-bold-duotone"
                      className="text-4xl text-red-500"
                    />
                  </button>
                  <button type="button" className="">
                    <Icon
                      icon="solar:pen-new-square-bold-duotone"
                      className="text-4xl text-amber-500"
                    />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
