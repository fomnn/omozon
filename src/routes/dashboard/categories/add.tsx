import {
  useCreateCategory,
  useGetAllCategories,
} from '@/services/categories-service'
import { Heading } from '@radix-ui/themes'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/dashboard/categories/add')({
  component: AddCategory,
})

function AddCategory() {
  const navigate = useNavigate()
  const { data: categories } = useGetAllCategories()
  const { mutate: createCategory } = useCreateCategory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState<number>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createCategory({
      name,
      description,
      category_parent_id: parentCategoryId,
    })
    navigate({
      to: '/dashboard/categories',
    })
  }

  return (
    <div className="px-40 py-6 space-y-6">
      <Heading>Add Category Page</Heading>

      <form className="add-something-form space-y-3" onSubmit={handleSubmit}>
        {/* name: text */}
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            onChange={e => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        {/* description: text */}
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={e => setDescription(e.target.value)}
            id="description"
            name="description"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="parent">Parent</label>
          <select
            id="parent"
            name="parent"
            onChange={e =>
              setParentCategoryId(Number.parseInt(e.target.value))}
          >
            <option>None</option>
            {categories?.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* submit buuton */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  )
}
