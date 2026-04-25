// app/(main)/carts/page.tsx
'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/common/section-title'
import { ShoppingCart, Trash2, Plus, Minus, Eye } from 'lucide-react'
import Image from 'next/image'
import { useShopStore } from '@/app/store/useShopStore'
import { toast } from 'sonner'
import { ShopModal } from '@/app/(main)/(exclusive)/exclusive-store/_components/shopModal'

export default function CartsPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useShopStore()

  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
    toast.success('Item removed from cart')
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
      toast.success('Cart cleared')
    }
  }

  const handleViewDetails = (id: string) => {
    setSelectedShopId(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedShopId(null)
  }

  const handleCheckout = () => {
    toast.info('Checkout feature coming soon!')
  }

  const total = getCartTotal()

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-[#9A9A9F]" />
          <SectionTitle eyebrow="YOUR SELECTION">Shopping Cart</SectionTitle>
        </div>

        {cart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-[13px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200 ease-apple"
          >
            Clear all
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingCart className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">Your cart is empty</h3>
          <p className="text-[14px] text-[#6E6E73]">Add some products to get started!</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map(item => (
              <div
                key={`${item.id}-${item.size || 'no-size'}`}
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
                  {item.size && (
                    <p className="text-[13px] text-[#6E6E73]">
                      Size: <span className="font-medium text-[#9A9A9F]">{item.size}</span>
                    </p>
                  )}
                  <p className="text-[17px] font-bold text-[#F5F5F7]">
                    ৳{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center border border-white/[0.1] rounded-[8px] overflow-hidden">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white/[0.06] transition-colors text-[#9A9A9F]"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-4 text-[14px] font-medium text-[#F5F5F7] min-w-[3ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white/[0.06] transition-colors text-[#9A9A9F]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="p-2 rounded-[8px] hover:bg-white/[0.06] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors"
                    aria-label="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 rounded-[8px] hover:bg-red-500/[0.08] text-[#6E6E73] hover:text-red-400 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-[12px] bg-[#161616] border border-white/[0.07] p-6 space-y-5">
              <h3 className="text-[17px] font-bold text-[#F5F5F7]">Order Summary</h3>

              <div className="space-y-3 border-t border-white/[0.07] pt-4">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6E6E73]">Items</span>
                  <span className="font-medium text-[#F5F5F7]">{cart.length}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6E6E73]">Subtotal</span>
                  <span className="font-medium text-[#F5F5F7]">৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6E6E73]">Shipping</span>
                  <span className="font-medium text-[#9A9A9F]">Free</span>
                </div>
              </div>

              <div className="border-t border-white/[0.07] pt-4">
                <div className="flex justify-between text-[16px] font-bold text-[#F5F5F7]">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-6 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-white/85 transition-all duration-200 ease-apple"
              >
                Proceed to Checkout
              </button>

              <p className="text-[11px] text-[#6E6E73] text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
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
