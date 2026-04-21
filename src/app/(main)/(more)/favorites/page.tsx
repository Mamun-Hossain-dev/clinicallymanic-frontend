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
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 fill-red-500 text-red-500" />
          <SectionTitle>My Wishlist</SectionTitle>
        </div>
        {wishlist.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground">
            Start adding products you love!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg bg-card p-4 transition-colors hover:bg-secondary border border-border"
            >
              {/* Product Image */}
              <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <div className="absolute left-2 top-2">
                  <span className="rounded bg-white px-2 py-0.5 text-xs font-bold text-black uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.name}
                </p>
                <h3 className="line-clamp-1 font-semibold text-foreground text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xl font-bold text-foreground">
                  ৳{item.price.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.status !== 'active'}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 text-sm font-medium text-green-500 hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="flex-shrink-0 rounded-lg p-2 hover:bg-destructive/10 text-destructive transition-colors"
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
