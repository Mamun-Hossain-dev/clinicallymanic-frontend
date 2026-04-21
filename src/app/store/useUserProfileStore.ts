import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Subscription {
  _id: string
  name: string
  type: 'monthly' | 'yearly'
  price: number
  status: 'active' | 'inactive'
  features: string[]
  totalSubscribedUsers: string[]
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  _id: string
  userId?: string
  firstName?: string
  lastName?: string
  email: string
  bio?: string
  phone?: string
  phoneNumber?: string
  profileImage?: string
  subscription?: Subscription
  subscriptionExpiry?: string
  fileType?: string
  uploadedAt?: string
  role?: string
  verified?: boolean
  isSubscription?: boolean
  createdAt?: string
  updatedAt?: string
  password?: string
  __v?: number
}

interface UserState {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  clearUser: () => void
  updateUser: (updates: Partial<UserProfile>) => void

  // Subscription helpers
  hasActiveSubscription: () => boolean
  getSubscriptionName: () => string | null
  isSubscriptionExpired: () => boolean
  hasFeature: (feature: string) => boolean
  isBasicPlan: () => boolean
  isExclusivePlan: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: user =>
        set({
          user: user
            ? {
                ...user,
                phone: user.phone || user.phoneNumber,
                phoneNumber: user.phoneNumber || user.phone,
              }
            : null,
        }),

      clearUser: () => set({ user: null }),

      updateUser: updates =>
        set(state => ({
          user: state.user
            ? {
                ...state.user,
                ...updates,
                phone:
                  ('phone' in updates ? updates.phone : undefined) ||
                  ('phoneNumber' in updates ? updates.phoneNumber : undefined) ||
                  state.user.phone,
                phoneNumber:
                  ('phoneNumber' in updates ? updates.phoneNumber : undefined) ||
                  ('phone' in updates ? updates.phone : undefined) ||
                  state.user.phoneNumber,
              }
            : null,
        })),

      // Check if user has active subscription
      hasActiveSubscription: () => {
        const { user } = get()
        if (!user || !user.isSubscription || !user.subscription) return false

        // Check if subscription is active
        if (user.subscription.status !== 'active') return false

        // Check if subscription is expired
        if (user.subscriptionExpiry) {
          const expiryDate = new Date(user.subscriptionExpiry)
          const now = new Date()
          return expiryDate > now
        }

        return true
      },

      // Get subscription name
      getSubscriptionName: () => {
        const { user } = get()
        return user?.subscription?.name || null
      },

      // Check if subscription is expired
      isSubscriptionExpired: () => {
        const { user } = get()
        if (!user?.subscriptionExpiry) return false

        const expiryDate = new Date(user.subscriptionExpiry)
        const now = new Date()
        return expiryDate <= now
      },

      // Check if user has a specific feature
      hasFeature: (feature: string) => {
        const { user } = get()
        if (!user?.subscription?.features) return false

        return user.subscription.features.some(
          f => f.toLowerCase() === feature.toLowerCase(),
        )
      },

      // Check if user is on Basic plan
      isBasicPlan: () => {
        const { user } = get()
        return user?.subscription?.name?.toLowerCase() === 'basic'
      },

      // Check if user is on Exclusive plan
      isExclusivePlan: () => {
        const { user } = get()
        return user?.subscription?.name?.toLowerCase() === 'exclusive'
      },
    }),
    {
      name: 'user-storage',
      partialize: state => ({ user: state.user }),
    },
  ),
)
