import { useGetAllCategories } from '@/services/categories-service'
import { Button, Heading, Table } from '@radix-ui/themes'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/categories/')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const { data: categories } = useGetAllCategories()

  return (
    <div className=" flex flex-col gap-6">
      <div className="flex justify-between">
        <Heading>Categories</Heading>
        <div className="">
          <Link to="/dashboard/categories/add">
            <Button>Add Categories</Button>
          </Link>
        </div>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Slug</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Parent Category</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories?.map((category) => (
            <Table.Row key={category.id}>
              <Table.RowHeaderCell>{category.name}</Table.RowHeaderCell>
              <Table.Cell>{category.description}</Table.Cell>
              <Table.Cell>{category.slug}</Table.Cell>
              <Table.Cell>
                {
                  categories.find((c) => c.id === category.category_parent_id)
                    ?.name
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
