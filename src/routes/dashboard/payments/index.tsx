import { useGetAllPaymentMethods } from '@/services/payment-methods-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/payments/')({
  component: PaymentsPage,
})

function PaymentsPage() {
  const { data: paymentMethods } = useGetAllPaymentMethods()
  return (
    <div className=" flex flex-col gap-6">
      <div className="flex justify-between">
        <Heading>Payments</Heading>
        <div className="flex ">
          <Link to="/dashboard/payments/add">
            <Button>Add Payment Method</Button>
          </Link>
        </div>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Provider</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              Transaction Fee (in percentage)
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {paymentMethods &&
            paymentMethods?.map((paymentMethod) => (
              <Table.Row key={paymentMethod.id}>
                <Table.RowHeaderCell>
                  {paymentMethod.provider}
                </Table.RowHeaderCell>
                <Table.Cell>{paymentMethod.transaction_fee}</Table.Cell>
                <Table.Cell>
                  {paymentMethod.status ? 'active' : 'inactive'}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
