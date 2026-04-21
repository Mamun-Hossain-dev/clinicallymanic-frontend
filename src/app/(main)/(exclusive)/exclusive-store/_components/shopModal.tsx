// components/shop/ShopModal.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  Loader2,
  X,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetShopById, useShopPayment } from '@/lib/api/shopApi'
import { useShopStore } from '@/app/store/useShopStore'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

interface ShopModalProps {
  shopId: string | null
  isOpen: boolean
  onClose: () => void
}

// Zod validation schema
const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  size: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function ShopModal({ shopId, isOpen, onClose }: ShopModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    size: '',
  })
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({})

  const { data, isLoading, isError } = useGetShopById(shopId)

  const { data: session, status } = useSession()
  const router = useRouter()

  const accessToken = session?.user?.accessToken || ''

  const { mutate: payForShop, isPending: isPaymentPending } =
    useShopPayment(accessToken)

  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } =
    useShopStore()

  const shop = data?.data

  const handlePrevImage = () => {
    if (shop) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? shop.images.length - 1 : prev - 1
      )
    }
  }

  const handleNextImage = () => {
    if (shop) {
      setCurrentImageIndex((prev) =>
        prev === shop.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const handleAddToCart = () => {
    if (!shop) return

    if (shop.size.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }

    addToCart({
      id: shop._id,
      name: shop.name,
      title: shop.title,
      description: shop.description,
      image: shop.images[0],
      price: shop.price,
      type: shop.type,
      size: selectedSize,
    })

    toast.success('Added to cart!')
  }

  const handleToggleWishlist = () => {
    if (!shop) return

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

  const handleBuyNowClick = () => {
    if (!shop) return

    // Check if user is signed in
    if (status !== 'authenticated') {
      toast.error('Please sign in to continue')
      router.push('/signin')
      return
    }

    // Check if accessToken is available
    if (!accessToken) {
      toast.error('Session expired. Please sign in again')
      router.push('/signin')
      return
    }

    // Size validation
    if (shop.size.length > 0 && !selectedSize) {
      toast.error('Please select a size')
      return
    }

    // Set size in form data before showing checkout form
    setFormData((prev) => ({ ...prev, size: selectedSize }))

    // Show checkout form
    setShowCheckoutForm(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field when user starts typing
    if (formErrors[name as keyof CheckoutFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!shop) return

    // Validate form data
    const result = checkoutSchema.safeParse(formData)

    if (!result.success) {
      const errors: Partial<Record<keyof CheckoutFormData, string>> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof CheckoutFormData] = err.message
        }
      })
      setFormErrors(errors)
      toast.error('Please fix the errors in the form')
      return
    }

    // Clear errors and proceed with payment
    setFormErrors({})

    payForShop(
      { shopId: shop._id, data: formData },
      {
        onSuccess: (response) => {
          const url = response.data?.url
          if (url && typeof window !== 'undefined') {
            window.location.href = url
          }
        },
        onError: (error) => {
          toast.error(error.message || 'Payment failed. Please try again.')
          console.error('Payment error:', error)
        },
      }
    )
  }

  const handleCloseCheckoutForm = () => {
    setShowCheckoutForm(false)
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      size: '',
    })
    setFormErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b0b0b] border-[#262626] text-white">
        {isLoading && (
          <div className="space-y-4 p-4">
            <div className="aspect-square bg-[#1a1a1a] rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 bg-[#1a1a1a] rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded w-5/6 animate-pulse" />
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load product details</p>
          </div>
        )}

        {shop && !showCheckoutForm && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#bdbcbc]">
                <Image
                  src={shop.images[currentImageIndex]}
                  alt={shop.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={95}
                />

                {shop.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                                 rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                                 rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {shop.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail images */}
              <div className="grid grid-cols-4 gap-2">
                {shop.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-blue-500'
                        : 'border-[#262626] hover:border-[#404040]'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${shop.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <DialogHeader>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                    >
                      {shop.type}
                    </Badge>
                    <button
                      onClick={handleToggleWishlist}
                      className="p-2 rounded-full hover:bg-[#1a1a1a] transition-colors"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(shop._id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-white'
                        }`}
                      />
                    </button>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {shop.title}
                  </DialogTitle>
                  <p className="text-sm text-[#aaa]">{shop.name}</p>
                </div>
              </DialogHeader>

              <div className="text-3xl font-bold text-white">
                ${shop.price.toLocaleString()}
              </div>

              <p className="text-[#aaa] leading-relaxed">{shop.description}</p>

              {/* Details */}
              {shop.details && (
                <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Product Details
                  </h4>
                  <p className="text-sm text-[#aaa]">{shop.details}</p>
                </div>
              )}

              {/* Size Selection */}
              {shop.size.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">
                    Select Size
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {shop.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border transition-colors ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                            : 'border-[#262626] text-[#aaa] hover:border-[#404040]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    shop.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <span className="text-sm text-[#aaa]">
                  {shop.status === 'active' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={shop.status !== 'active'}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNowClick}
                  disabled={shop.status !== 'active'}
                  variant="outline"
                  className="flex-1 border-[#262626] hover:bg-[#1a1a1a] text-white"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {shop && showCheckoutForm && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  Checkout Details
                </DialogTitle>
              </DialogHeader>
              <button
                onClick={handleCloseCheckoutForm}
                className="p-2 rounded-full hover:bg-[#1a1a1a] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
              <h4 className="text-sm font-semibold text-white mb-3">
                Order Summary
              </h4>
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#bdbcbc] flex-shrink-0">
                  <Image
                    src={shop.images[0]}
                    alt={shop.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{shop.title}</p>
                  <p className="text-sm text-[#aaa]">{shop.name}</p>
                  {selectedSize && (
                    <p className="text-sm text-[#aaa]">Size: {selectedSize}</p>
                  )}
                  <p className="text-lg font-bold text-white mt-1">
                    ৳{shop.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Saurav Sarkar"
                  className="bg-[#141414] border-[#262626] text-white placeholder:text-[#666]"
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+880123456789"
                  className="bg-[#141414] border-[#262626] text-white placeholder:text-[#666]"
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="saurav@example.com"
                  className="bg-[#141414] border-[#262626] text-white placeholder:text-[#666]"
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Dhaka, Bangladesh"
                  className="bg-[#141414] border-[#262626] text-white placeholder:text-[#666]"
                />
                {formErrors.location && (
                  <p className="text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>

              {/* Size Selection in Checkout */}
              {shop.size.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-white">Selected Size</Label>
                  <div className="flex gap-2 flex-wrap">
                    {shop.size.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size)
                          setFormData((prev) => ({ ...prev, size }))
                        }}
                        className={`px-4 py-2 rounded-md border transition-colors ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                            : 'border-[#262626] text-[#aaa] hover:border-[#404040]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={handleCloseCheckoutForm}
                  variant="outline"
                  className="flex-1 border-[#262626] hover:bg-[#1a1a1a] text-white"
                  disabled={isPaymentPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPaymentPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {isPaymentPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
