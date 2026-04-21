// lib/store/shopStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  title: string
  description: string
  image: string
  size?: string
  price: number
  quantity: number
  type: string
}

export interface WishlistItem {
  id: string
  name: string
  title: string
  description: string
  image: string
  price: number
  type: string
  status: string
}

interface ShopState {
  cart: CartItem[]
  wishlist: WishlistItem[]

  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number

  // Wishlist actions
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      // Cart Actions
      addToCart: item => {
        const cart = get().cart
        const existingItem = cart.find(
          i => i.id === item.id && i.size === item.size,
        )

        if (existingItem) {
          set({
            cart: cart.map(i =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          })
        } else {
          set({
            cart: [...cart, { ...item, quantity: 1 }],
          })
        }
      },

      removeFromCart: id => {
        set({
          cart: get().cart.filter(item => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }

        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        )
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      // Wishlist Actions
      addToWishlist: item => {
        const wishlist = get().wishlist
        if (!wishlist.find(i => i.id === item.id)) {
          set({
            wishlist: [...wishlist, item],
          })
        }
      },

      removeFromWishlist: id => {
        set({
          wishlist: get().wishlist.filter(item => item.id !== id),
        })
      },

      isInWishlist: id => {
        return get().wishlist.some(item => item.id === id)
      },

      clearWishlist: () => {
        set({ wishlist: [] })
      },
    }),
    {
      name: 'shop-storage',
    },
  ),
)
