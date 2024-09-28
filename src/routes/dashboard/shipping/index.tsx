import { useGetAllShippingMethods } from '@/services/shipping-methods-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/shipping/')({
  component: ShippingPage,
})

function ShippingPage() {
  const { data: shippingMethods } = useGetAllShippingMethods()

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex justify-between">
        <Heading>Shipping</Heading>
        <div className="">
          <Link to="/dashboard/shipping/add">
            <Button>Add Shipping Method</Button>
          </Link>
        </div>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Shipping Method</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {shippingMethods &&
            shippingMethods?.map((shippingMethod) => (
              <Table.Row key={shippingMethod.id}>
                <Table.RowHeaderCell>
                  {shippingMethod.option}
                </Table.RowHeaderCell>
                <Table.Cell>
                  {shippingMethod.status ? 'active' : 'inactive'}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
