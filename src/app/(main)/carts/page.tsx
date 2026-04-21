// app/(main)/carts/page.tsx
'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/common/section-title'
import { ShoppingCart, Trash2, Plus, Minus, Eye } from 'lucide-react'
import Image from 'next/image'
import { useShopStore } from '@/app/store/useShopStore'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
        <div className="flex items-center  gap-2 w-full">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <SectionTitle>Shopping Cart</SectionTitle>
        </div>

        {cart.length > 0 && (
          <Button
            onClick={handleClearCart}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            Clear Cart
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">
            Add some products to get started!
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={`${item.id}-${item.size || 'no-size'}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg bg-card p-4 border border-border"
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
                  <h3 className="line-clamp-1 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  {item.size && (
                    <p className="text-sm text-muted-foreground">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                  )}
                  <p className="text-lg font-bold text-foreground">
                    ৳{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-2 border border-border rounded-lg">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-secondary transition-colors rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-medium min-w-[3ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-secondary transition-colors rounded-r-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                    aria-label="View details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg bg-card p-6 border border-border space-y-4">
              <h3 className="text-xl font-bold">Order Summary</h3>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{cart.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center">
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
