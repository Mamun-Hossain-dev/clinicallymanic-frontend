// app/(main)/favorites/page.tsx
'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/common/section-title'
import { Heart, ShoppingCart, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import { useShopStore } from '@/app/store/useShopStore'
import { toast } from 'sonner'
import { ShopModal } from '@/app/(main)/(exclusive)/exclusive-store/_components/shopModal'

export default function FavoritesPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShopStore()
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id)
    toast.success('Removed from wishlist')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      type: item.type,
    })
    toast.success('Added to cart!')
  }

  const handleViewDetails = (id: string) => {
    setSelectedShopId(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedShopId(null)
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 text-red-400/70" fill="currentColor" />
          <SectionTitle eyebrow="SAVED ITEMS">My Wishlist</SectionTitle>
        </div>
        {wishlist.length > 0 && (
          <p className="text-[13px] text-[#6E6E73]">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">Your wishlist is empty</h3>
          <p className="text-[14px] text-[#6E6E73]">Start adding products you love!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[12px] bg-[#161616] border border-white/[0.07] p-4 transition-all duration-200 hover:border-white/[0.12]"
            >
              {/* Product Image */}
              <div className="relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-[8px] bg-[#1a1a1a]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <div className="absolute left-1.5 top-1.5">
                  <span className="rounded-full bg-white/[0.15] backdrop-blur-[4px] px-2 py-0.5 text-[10px] font-medium text-white uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-[11px] font-medium text-[#6E6E73] uppercase tracking-[0.08em]">
                  {item.name}
                </p>
                <h3 className="line-clamp-1 font-semibold text-[15px] text-[#F5F5F7]">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#9A9A9F] line-clamp-1">
                  {item.description}
                </p>
                <p className="text-[18px] font-bold text-[#F5F5F7]">
                  ৳{item.price.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-full border border-white/[0.12] px-4 py-2 text-[13px] font-medium text-[#9A9A9F] hover:text-[#F5F5F7] hover:border-white/[0.2] transition-all duration-200 ease-apple"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.status !== 'active'}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-[13px] font-medium hover:bg-white/85 transition-all duration-200 ease-apple disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="flex-shrink-0 p-2 rounded-full hover:bg-red-500/[0.08] text-[#6E6E73] hover:text-red-400 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
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
