import { useQuery, useMutation } from '@tanstack/react-query'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

// =====================
// Types
// =====================
export interface Subscription {
  _id: string
  name: string
  type: 'weekly' | 'monthly' | 'yearly'
  price: number
  status: 'active' | 'inactive'
  features: string[]
  totalSubscribedUsers: string[]
  createdAt: string
  updatedAt: string
}

export interface SubscriptionsResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Subscription[]
}

export interface PaymentResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    url: string
    sessionId: string
  }
}

type CheckoutPayload = {
  subscriptionId: string
  token: string
  successUrl?: string
  cancelUrl?: string
}

type BackendPlan = {
  id: string
  name: string
  interval: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  price: number | string
  isActive: boolean
  features: string[]
  _count?: {
    subscriptions?: number
  }
  createdAt: string
  updatedAt: string
}

// =====================
// Get all subscriptions
// =====================
export const useGetSubscriptions = () => {
  return useQuery<SubscriptionsResponse>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/subscriptions/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!res.ok) {
        throw new Error('Failed to fetch subscriptions')
      }

      const result = await res.json()
      return {
        ...result,
        data: (result.data as BackendPlan[]).map(plan => ({
          _id: plan.id,
          name: plan.name,
          type: plan.interval.toLowerCase(),
          price: Number(plan.price),
          status: plan.isActive ? 'active' : 'inactive',
          features: Array.isArray(plan.features) ? plan.features : [],
          totalSubscribedUsers: Array.from(
            { length: plan._count?.subscriptions ?? 0 },
            () => '',
          ),
          createdAt: plan.createdAt,
          updatedAt: plan.updatedAt,
        })),
      } as SubscriptionsResponse
    },
  })
}

// =====================
// Pay for subscription
// =====================
export const usePaySubscription = () => {
  return useMutation({
    mutationFn: async ({
      subscriptionId,
      token,
      successUrl,
      cancelUrl,
    }: CheckoutPayload) => {
      const res = await fetch(`${API_URL}/subscriptions/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: subscriptionId,
          successUrl,
          cancelUrl,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.message || 'Payment failed')
      }

      return (await res.json()) as PaymentResponse
    },
  })
}
