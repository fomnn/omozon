import { useGetAllSuppliers } from '@/services/suppliers-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/suppliers/')({
  component: PaymentsPage,
})

function PaymentsPage() {
  const { data: suppliersList } = useGetAllSuppliers()

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex justify-between">
        <Heading>Suppliers</Heading>
        <div className="flex ">
          <Link to="/dashboard/suppliers/add">
            <Button>Add Supplier</Button>
          </Link>
        </div>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {suppliersList &&
            suppliersList?.map((supplier) => (
              <Table.Row key={supplier.id}>
                <Table.RowHeaderCell>{supplier.name}</Table.RowHeaderCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
