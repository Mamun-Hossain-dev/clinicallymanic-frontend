/* eslint-disable @typescript-eslint/no-explicit-any */
// app/shop/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart, Eye, Heart, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
import { useGetAllShops } from '@/lib/api/shopApi'
import { ShopSkeleton } from '@/app/(main)/(exclusive)/exclusive-store/_components/shopSkeleton'
import { ShopError } from '@/app/(main)/(exclusive)/exclusive-store/_components/shopErrorPage'
import { ShopModal } from '@/app/(main)/(exclusive)/exclusive-store/_components/shopModal'
import { Pagination } from '@/components/common/pagination'
import { useShopStore } from '@/app/store/useShopStore'
import { toast } from 'sonner'
import Link from 'next/link'

const ITEMS_PER_PAGE = 8

interface ShopPageProps {
  isHomePage?: boolean
  title?: string
  defaultType?: 'standard' | 'exclusive'
}

export default function ShopPage({
  isHomePage,
  title = 'Shop Collection',
  defaultType,
}: ShopPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read URL params
  const currentPageParams = Number(searchParams.get('page')) || 1
  const searchTerm = searchParams.get('searchTerm') || undefined
  const categoryParams = searchParams.get('categories') || undefined

  // For Homepage we might just want to show page 1, fixed limit
  const currentPage = isHomePage ? 1 : currentPageParams
  const limit = isHomePage ? 4 : ITEMS_PER_PAGE

  const typeParam = searchParams.get('type') || defaultType || undefined

  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useGetAllShops({
    page: currentPage,
    limit: limit,
    searchTerm: searchTerm,
    categories: categoryParams,
    type: typeParam,
  })

  // Update handlers to change URL instead of local state
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`, { scroll: true })
  }

  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
    useShopStore()

  const handleViewDetails = (shopId: string) => {
    setSelectedShopId(shopId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedShopId(null)
  }

  // Not used anymore since API handles it
  /*
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  */

  const handleAddToCart = (shop: any, e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id: shop._id,
      name: shop.name,
      title: shop.title,
      description: shop.description,
      image: shop.images[0],
      price: shop.price,
      type: shop.type,
    })
    toast.success('Added to cart!')
  }

  const handleToggleWishlist = (shop: any, e: React.MouseEvent) => {
    e.stopPropagation()
    const inWishlist = isInWishlist(shop._id)

    if (inWishlist) {
      removeFromWishlist(shop._id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: shop._id,
        name: shop.name,
        title: shop.title,
        description: shop.description,
        image: shop.images[0],
        price: shop.price,
        type: shop.type,
        status: shop.status,
      })
      toast.success('Added to wishlist!')
    }
  }

  const displayedShops = useMemo(() => {
    if (!data) return []
    return data.data || []
  }, [data])

  // Use meta from API for pagination
  const totalItems = data?.meta?.total || 0

  if (isLoading && currentPage === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-medium tracking-wider text-white">
            {title}
          </h2>
        </div>
        <ShopSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-medium tracking-wider text-white">
            {title}
          </h2>
        </div>
        <ShopError onRetry={() => refetch()} />
      </div>
    )
  }

  // const displayedShops = isHomePage ? filteredShops.slice(0, 4) : filteredShops
  // const totalItems = isHomePage ? displayedShops.length : filteredShops.length

  return (
    <div className=" px-4 py-8">
      {/* Section Header with Filters */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-medium tracking-wider text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Discover {!isHomePage ? totalItems : ''} amazing products
          </p>
        </div>

        {isHomePage ? (
          <Link href={defaultType === 'exclusive' ? '/exclusive-store' : '/shop'}>
            <button className="hidden rounded-lg bg-zinc-800 px-6 py-2 transition-colors hover:bg-zinc-700 sm:block">
              View All
            </button>
          </Link>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {[
                'all',
                'mens',
                'womens',
                'childrens',
                'accessories',
                'other',
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    if (cat === 'all') params.delete('categories')
                    else params.set('categories', cat)
                    params.set('page', '1')
                    router.push(`?${params.toString()}`, { scroll: false })
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    categoryParams === cat || (cat === 'all' && !categoryParams)
                      ? 'bg-white text-black shadow-md'
                      : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-[500px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Search for amazing products..."
                className="w-full pl-12 pr-24 h-14 bg-zinc-900/80 border-zinc-700/50 focus:border-zinc-500 focus:bg-zinc-900 text-lg rounded-2xl shadow-sm transition-all"
                defaultValue={searchTerm}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const params = new URLSearchParams(searchParams.toString())
                    const val = (e.currentTarget as HTMLInputElement).value
                    if (val) params.set('searchTerm', val)
                    else params.delete('searchTerm')
                    params.set('page', '1')
                    router.push(`?${params.toString()}`)
                  }
                }}
              />
              <button
                onClick={e => {
                  const input = e.currentTarget
                    .previousElementSibling as HTMLInputElement
                  const params = new URLSearchParams(searchParams.toString())
                  const val = input.value
                  if (val) params.set('searchTerm', val)
                  else params.delete('searchTerm')
                  params.set('page', '1')
                  router.push(`?${params.toString()}`)
                }}
                className="absolute right-2 top-2 bottom-2 bg-white text-black hover:bg-zinc-200 px-6 font-semibold rounded-xl text-sm transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {displayedShops.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No products found
          </h3>
          <p className="text-zinc-400">
            Check back later for new items!
          </p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedShops.map(shop => {
              const inWishlist = isInWishlist(shop._id)

              return (
                <div
                  key={shop._id}
                  className="group relative overflow-hidden rounded-md bg-zinc-800 transition-all hover:ring-2 hover:ring-zinc-700"
                >
                  {/* Image Wrapper */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <Image
                      src={shop.images[0]}
                      alt={shop.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <span className="rounded bg-white px-3 py-1 text-xs font-bold text-black uppercase">
                        {shop.type}
                      </span>
                    </div>
                    <div className="absolute right-3 top-3 z-10 flex space-x-2">
                      {/* Wishlist */}
                      <button
                        onClick={e => handleToggleWishlist(shop, e)}
                        className="rounded-full bg-black/60 p-2 opacity-0 transition-all hover:bg-black/80 group-hover:opacity-100"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            inWishlist
                              ? 'fill-red-500 text-red-500'
                              : 'text-white'
                          }`}
                        />
                      </button>

                      {/* Quick View Button */}
                      <button
                        onClick={() => handleViewDetails(shop._id)}
                        className="rounded-full bg-black/60 p-2 opacity-0 transition-all hover:bg-black/80 group-hover:opacity-100"
                        aria-label="Quick view details"
                      >
                        <Eye className="h-6 w-6 text-white" />
                      </button>
                    </div>

                    {/* Add to Cart Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        onClick={e => handleAddToCart(shop, e)}
                        className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-zinc-200"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="mb-1 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {shop.name}
                    </p>
                    <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-white">
                      {shop.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-zinc-400">
                      {shop.description}
                    </p>
                    <p className="text-xl font-bold text-white">
                      $ {' ' + shop.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {!isHomePage && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </>
      )}

      {/* Modal */}
      <ShopModal
        shopId={selectedShopId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
