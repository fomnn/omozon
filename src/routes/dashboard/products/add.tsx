import { useGetAllCategories } from '@/services/categories-service'
import { useGetAllPaymentMethods } from '@/services/payment-methods-service'
import { useCreateProduct } from '@/services/products-service'
import { useGetAllSuppliers } from '@/services/suppliers-service'
import { useGetAllTags } from '@/services/tags-service'
import { Icon } from '@iconify/react'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/dashboard/products/add')({
  component: AddProduct,
})

interface ProductsAdd {
  name: string
  longDesc: string
  shortDesc: string
  categoryIds: number[]
  tags: string[]
  shippingMethodIds: number[]
  supplier?: number
}

interface VariantAdd {
  name: string
  sku: string
  price: string
  discounted_price: string
  stock_quantity: number
  weight: number
  material: string
  product_images: File[] | null
}

function AddProduct() {
  const navigate = useNavigate()
  const { data: categories } = useGetAllCategories()
  const { data: shippingMethods } = useGetAllPaymentMethods()
  const { data: suppliers } = useGetAllSuppliers()
  const { data: tags } = useGetAllTags()
  const { mutate: createProduct } = useCreateProduct()
  const [product, setProduct] = useState<ProductsAdd>({
    name: '',
    longDesc: '',
    shortDesc: '',
    categoryIds: [],
    tags: [] satisfies string[],
    shippingMethodIds: [] satisfies number[],
    supplier: undefined,
  })
  const [tagInputValue, setTagInputValue] = useState('')
  const [variants, setVariants] = useState<VariantAdd[]>([
    {
      name: 'Default',
      sku: '',
      price: '',
      discounted_price: '',
      stock_quantity: 0,
      weight: 0,
      material: '',
      product_images: null,
    },
  ])
  const [previewVariantImages, setPreviewVariantImages] = useState<string[][]>([
    [],
  ])
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [categoryNumber, setCategoryNumber] = useState(1)
  const appendImageRef = useRef<HTMLInputElement>(null)

  function addVariant() {
    // eslint-disable-next-line no-alert
    const newVariantName = prompt('Variant Name')
    if (!newVariantName)
      return

    setVariants(v => [
      ...v,
      {
        name: newVariantName,
        sku: '',
        price: '',
        discounted_price: '',
        stock_quantity: 0,
        weight: 0,
        material: '',
        product_images: null,
      },
    ])
  }

  function handleAddShippingMethod(id: number) {
    setProduct(p => ({
      ...p,
      shippingMethodIds: [...p.shippingMethodIds, id],
    }))
  }

  function handleSetCategory({ id, index }: { id: number, index: number }) {
    setProduct((prevProduct) => {
      const newCategoryIds = [...prevProduct.categoryIds]
      // Jika index lebih besar dari panjang array, tambahkan di akhir
      if (index >= newCategoryIds.length) {
        newCategoryIds.push(id)
      }
      else {
        newCategoryIds[index] = id // Ganti nilai di posisi index
      }
      return {
        ...prevProduct,
        categoryIds: newCategoryIds,
      }
    })
  }

  function addCategoryNumber() {
    if (!product.categoryIds[categoryNumber - 1]) {
      // eslint-disable-next-line no-alert
      return alert('you should fill previous category')
    }
    setCategoryNumber(cn => cn + 1)
  }

  function handleKeyDownWhenFocusInInputTag(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (product.tags.includes(tagInputValue)) {
        // eslint-disable-next-line no-alert
        alert(`${tagInputValue} already included`)

        return setTagInputValue('')
      }

      setProduct(p => ({
        ...p,
        tags: [...p.tags, tagInputValue],
      }))

      setTagInputValue('')
    }
  }

  function AddVariantImages(files: FileList | null) {
    if (files) {
      // Konversi FileList ke array
      const fileArray = Array.from(files)
      const previewImages: string[] = []

      // Gunakan FileReader untuk membaca setiap file
      fileArray.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            previewImages.push(e.target.result as string)

            // Update state previewVariantImages setelah semua file terbaca
            if (previewImages.length === fileArray.length) {
              setPreviewVariantImages((prev) => {
                const updatedPreviews = [...prev]
                updatedPreviews[selectedVariantIndex] = previewImages // Update gambar pada varian terpilih
                return updatedPreviews
              })
            }
          }
        }
        reader.readAsDataURL(file) // Baca file sebagai Data URL
      })

      // Update state variants
      setVariants((v) => {
        const updatedVariants = [...v]
        updatedVariants[selectedVariantIndex] = {
          ...updatedVariants[selectedVariantIndex],
          product_images: fileArray, // Simpan file asli dalam state variants
        }
        return updatedVariants
      })
    }
  }

  function appendVariantImages(files: FileList | null) {
    if (files) {
      // Konversi FileList ke array
      const fileArray = Array.from(files)
      const previewImages: string[] = []

      // Gunakan FileReader untuk membaca setiap file
      fileArray.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            previewImages.push(e.target.result as string)

            // Update state previewVariantImages setelah semua file terbaca
            if (previewImages.length === fileArray.length) {
              setPreviewVariantImages((prev) => {
                const updatedPreviews = [...prev]
                // Tambahkan gambar baru ke array yang sudah ada
                updatedPreviews[selectedVariantIndex] = [
                  ...(updatedPreviews[selectedVariantIndex] || []), // Gabungkan dengan gambar sebelumnya
                  ...previewImages,
                ]
                return updatedPreviews
              })
            }
          }
        }
        reader.readAsDataURL(file) // Baca file sebagai Data URL
      })

      // Update state variants
      setVariants((v) => {
        const updatedVariants = [...v]
        // Tambahkan file baru ke array file yang sudah ada
        updatedVariants[selectedVariantIndex] = {
          ...updatedVariants[selectedVariantIndex],
          product_images: [
            ...(updatedVariants[selectedVariantIndex].product_images || []), // Gabungkan dengan file sebelumnya
            ...fileArray,
          ],
        }
        return updatedVariants
      })
    }
  }

  function handleSubmit() {
    createProduct({
      product: {
        name: product.name,
        long_desc: product.longDesc,
        short_desc: product.shortDesc,
        product_tags: product.tags,
        category_id: product.categoryIds[0],
        category_id_2: product.categoryIds[1],
        category_id_3: product.categoryIds[2],
        shipping_method_ids: product.shippingMethodIds,
        supplier_id: product.supplier!,
      },
      variants: variants.map(v => ({
        ...v,
        price: Number.parseInt(v.price),
        discounted_price: Number.parseInt(v.discounted_price),
      })),
    })
    navigate({
      to: '/dashboard/products',
    })
  }

  return (
    <div className="px-40 py-6 space-y-6">
      <div className="">
        <h1 className="text-3xl">Add Product Page</h1>
        <p>This is the add product page. You can add a new product here.</p>
      </div>

      <form
        className="add-something-form pb-20"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        {/* name: text */}
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={e =>
              setProduct(p => ({ ...p, name: e.target.value }))}
            required
          />
        </div>

        {/* description: text */}
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={e =>
              setProduct(p => ({ ...p, longDesc: e.target.value }))}
            required
          />
        </div>

        {/* short description: text [optional] */}
        <div className="flex flex-col">
          <label htmlFor="shortDescription">Short Description</label>
          <input
            type="text"
            id="shortDescription"
            onChange={e =>
              setProduct(p => ({ ...p, shortDesc: e.target.value }))}
            required
          />
        </div>

        {/* category: select */}
        <div className="grid grid-cols-3 gap-4">
          {[...Array.from({ length: categoryNumber }).keys()].map(index => (
            <div className="flex flex-col" key={index}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                required
                onChange={e =>
                  handleSetCategory({
                    id: Number.parseInt(e.target.value),
                    index,
                  })}
              >
                <option>Select Category</option>
                {categories
                  ?.filter((c) => {
                    if (product.categoryIds[index] === c.id)
                      return true
                    return !product.categoryIds.includes(c.id)
                  })
                  .map(category => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          ))}
          {categoryNumber <= 2
            ? (
                <div className="flex flex-col justify-end">
                  <div className=""></div>
                  <button
                    onClick={addCategoryNumber}
                    type="button"
                    className="border border-slate-200 py-1 flex items-center gap-2 px-4 rounded-sm"
                  >
                    <span>Add category</span>
                    <Icon icon="solar:add-square-bold-duotone" />
                  </button>
                </div>
              )
            : null}
        </div>

        {/* product variants: array of object [coming soon] */}
        <div className="flex flex-col">
          <p>Variants</p>
          <div className="flex items-center gap-2">
            {variants.map((variant, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex gap-1">
                <input
                  type="radio"
                  name=""
                  id=""
                  onChange={() => setSelectedVariantIndex(i)}
                  checked={selectedVariantIndex === i}
                />
                <label htmlFor="">{variant.name}</label>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="text-sm px-2 py-0.5 border"
            >
              Add variant
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4 pb-3 pt-5 mt-6 border my-3 relative">
          <p className="border w-fit h-fit absolute -top-4 left-5 bg-white dark:bg-zinc-800 px-4 text-lg font-semibold">
            {variants[selectedVariantIndex].name}
          </p>
          {/* SKU(Stock Keeping Unit): text */}
          <div className="flex flex-col">
            <label htmlFor="sku">SKU (optional)</label>
            <input
              type="text"
              id="sku"
              value={variants[selectedVariantIndex].sku}
              onChange={e =>
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    sku: e.target.value, // Update nilai SKU
                  }
                  return updatedVariants
                })}
              name="sku"
            />
          </div>

          {/* price: number */}
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={variants[selectedVariantIndex].price}
              onChange={e =>
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    price: e.target.value, // Update nilai SKU
                  }
                  return updatedVariants
                })}
              name="price"
              required
            />
          </div>

          {/* discounted price: number [optional] */}
          <div className="flex flex-col">
            <label htmlFor="discount">Discounted Price</label>
            <input
              type="number"
              value={variants[selectedVariantIndex].discounted_price}
              onChange={e =>
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    discounted_price: e.target.value, // Update nilai SKU
                  }
                  return updatedVariants
                })}
              id="discount"
              name="discount"
            />
          </div>

          {/* stock quantity: number */}
          <div className="flex flex-col">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={variants[selectedVariantIndex].stock_quantity}
              onChange={e =>
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    stock_quantity: Number.parseInt(e.target.value), // Update nilai SKU
                  }
                  return updatedVariants
                })}
              required
            />
          </div>

          {/* weight: number */}
          <div className="flex flex-col">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={variants[selectedVariantIndex].weight}
              onChange={(e) => {
                // Ensure the value is not negative
                if (Number.parseInt(e.target.value) < 0)
                  return
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    weight: Number.parseInt(e.target.value), // Update nilai SKU
                  }
                  return updatedVariants
                })
              }}
            />
          </div>

          {/* material: text [optional] */}
          <div className="flex flex-col">
            <label htmlFor="material">Material</label>
            <input
              type="text"
              id="material"
              name="material"
              value={variants[selectedVariantIndex].material}
              onChange={e =>
                setVariants((v) => {
                  const updatedVariants = [...v] // Salin array variants
                  updatedVariants[selectedVariantIndex] = {
                    ...updatedVariants[selectedVariantIndex], // Salin varian yang dipilih
                    material: e.target.value, // Update nilai SKU
                  }
                  return updatedVariants
                })}
            />
          </div>

          {/* product images: file upload(array of images) [optional] */}
          <div className="flex flex-col">
            <label htmlFor="images">Product Images</label>
            <input
              type="file"
              id="images"
              accept=".jpg, .jpeg, .png"
              name="images"
              onChange={e => AddVariantImages(e.target.files)}
              multiple
            />
          </div>
          {
            previewVariantImages[selectedVariantIndex]
            && previewVariantImages[selectedVariantIndex].length > 0
              ? (
                  <div className="flex flex-col">
                    <p>Preview Images</p>
                    <div className="grid grid-cols-12 gap-1">
                      {previewVariantImages[selectedVariantIndex]?.map((image, i) =>
                        (
                          <img
                            src={image}
                            alt=""
                            className="aspect-square overflow-hidden object-cover rounded-sm"
                            key={i}
                          />
                        ))}
                      {/* <button type="button" className="w-full aspect-square bg-slate-300 rounded-sm flex items-center justify-center"> */}
                      <button
                        type="button"
                        className="w-full aspect-square"
                        onClick={() => appendImageRef.current?.click()}
                      >
                        <Icon
                          icon="solar:add-square-bold-duotone"
                          className="text-4xl"
                        />
                      </button>
                      <input
                        ref={appendImageRef}
                        type="file"
                        id="images"
                        className="hidden"
                        accept=".jpg, .jpeg, .png"
                        name="images"
                        onChange={e => appendVariantImages(e.target.files)}
                        multiple
                      />
                    </div>
                  </div>
                )
              : (
                  <div />
                )
          }
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="tags">Tags (array of text, refactor later)</label>
            <ul className="list-disc list-inside">
              {product.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p>
              <input
                list="tag-options"
                id="tags"
                name="tags"
                value={tagInputValue}
                onChange={e => setTagInputValue(e.target.value)}
                onKeyDown={handleKeyDownWhenFocusInInputTag}
                className="w-full"
                placeholder="choose tags"
              />
              <datalist id="tag-options">
                {tags
                  ?.filter(tag2 => !product.tags.includes(tag2.tag))
                  .map(tag => <option value={tag.tag} key={tag.id} />)}
              </datalist>
            </p>
          </div>

          {/* shipping options: array of text [optional] */}
          {/* refactor later */}
          <div className="flex flex-col">
            <label htmlFor="shippingOptions">
              Shipping Options (array of text, refactor later)
            </label>
            <ul className="list-disc list-inside">
              {product.shippingMethodIds.map(shippingMethodId => (
                <li key={shippingMethodId}>
                  {
                    shippingMethods?.find(sm => sm.id === shippingMethodId)
                      ?.provider
                  }
                </li>
              ))}
            </ul>
            {/* <input type="text" id="shippingOptions" name="shippingOptions" /> */}
            <select
              onChange={e =>
                handleAddShippingMethod(Number.parseInt(e.target.value))}
            >
              <option>Select Shipping Method</option>
              {shippingMethods
                ?.filter(
                  shippingMethod2 =>
                    !product.shippingMethodIds.includes(shippingMethod2.id),
                )
                .map(shippingMethod => (
                  <option value={shippingMethod.id} key={shippingMethod.id}>
                    {shippingMethod.provider}
                  </option>
                ))}
            </select>
          </div>

          {/* supplier: text [optional] */}
          <div className="flex flex-col">
            <label htmlFor="supplier">Supplier</label>
            <select
              onChange={e =>
                setProduct(p => ({
                  ...p,
                  supplier: Number.parseInt(e.target.value),
                }))}
              id="supplier"
              required
            >
              <option>Select Supplier</option>
              {suppliers?.map(supplier => (
                <option value={supplier.id} key={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* tags: array of text [optional] */}

        {/* added date: date [automatic] */}

        {/* last updated: date [automatic] */}
        <div className="py-6">
          <button
            type="submit"
            className="bg-zinc-800 text-white w-full py-2 rounded-sm"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}
