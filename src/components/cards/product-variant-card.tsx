import { baseImagesURL } from '@/lib/ofetch'
import { useGetVariantsByProductId } from '@/services/variants-service'
import { Icon } from '@iconify/react'
import { Box, Card, Heading, Separator } from '@radix-ui/themes'
import clsx from 'clsx'

interface ProductVariantCardProps {
  showVariantCard: boolean
  productIdVariant: number
  clodeVariantCard: () => void
}

export default function ProductVariantCard({ showVariantCard, productIdVariant, clodeVariantCard }: ProductVariantCardProps) {
  const { data: variants, isFetching } = useGetVariantsByProductId(productIdVariant)
  return (
    <div className={clsx(
      'bg-white dark:bg-zinc-800 rounded-md p-4 transition-all duration-300',
      {
        'w-0 translate-x-[100%]': !showVariantCard,
        'block w-2/6': showVariantCard,
      },
    )}
    >
      <div className="flex justify-between">
        <Heading>Variants</Heading>
        <button type="button" onClick={clodeVariantCard}>
          <Icon icon="solar:close-square-bold-duotone" className="text-3xl text-red-700/60" />
        </button>
      </div>
      <Separator my="3" size="4" />
      <div className="flex flex-col gap-2">
        {!isFetching && variants && variants?.map(variant => (
          <Box key={variant.id}>
            <Card>
              <div className="flex gap-2">
                <div className="w-7/12">
                  <p className="text-lg">{variant.name}</p>
                  <p className="text-sm font-thin">
                    Rp.
                    {variant.price}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {variant.variant_images?.slice(0, 3).map(image => (
                    <img src={`${baseImagesURL}/images/variants/${image.file_name}`} key={image.file_name} alt="" className="size-14 overflow-hidden object-cover" />
                  ))}
                </div>
              </div>
            </Card>
          </Box>
        ))}
        {isFetching && <p>Loading...</p>}
      </div>
    </div>
  )
}
