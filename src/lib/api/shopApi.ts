// lib/api/shopApi.ts
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface Shop {
  _id: string
  name: string
  title: string
  description: string
  images: string[]
  size: string[]
  price: number
  type: string
  status: 'active' | 'inactive'
  details: string
  createdBy: string
  createdAt: string
  updatedAt: string
  categories?: string[]
}

export interface ShopResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: {
    total: number
    page: number
    limit: number
  }
  data: Shop[]
}

export interface SingleShopResponse {
  statusCode: number
  success: boolean
  message: string
  data: Shop
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

// Payment request data interface
export interface PaymentRequestData {
  name: string
  phone: string
  email: string
  location: string
  size?: string
}

// Get all shops
interface UseGetAllShopsParams {
  page?: number
  limit?: number
  searchTerm?: string
  type?: string
  categories?: string
  sortBy?: string
  sortOrder?: string
}

export const useGetAllShops = (params: UseGetAllShopsParams) => {
  const {
    page = 1,
    limit = 10,
    searchTerm,
    type,
    categories,
    sortBy,
    sortOrder,
  } = params

  return useQuery<ShopResponse>({
    queryKey: [
      'shops',
      page,
      limit,
      searchTerm,
      type,
      categories,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (page) queryParams.append('page', page.toString())
      if (limit) queryParams.append('limit', limit.toString())
      if (searchTerm) queryParams.append('searchTerm', searchTerm)
      // if (type) queryParams.append('type', type)
      if (categories) queryParams.append('categories', categories)
      if (sortBy) queryParams.append('sortBy', sortBy)
      if (sortOrder) queryParams.append('sortOrder', sortOrder)

      const response = await fetch(
        `${API_BASE_URL}/shop?${queryParams.toString()}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch shops')
      }
      return response.json()
    },
    placeholderData: keepPreviousData,
  })
}

// Get single shop by ID
export const useGetShopById = (id: string | null) => {
  return useQuery<SingleShopResponse>({
    queryKey: ['shop', id],
    queryFn: async () => {
      if (!id) throw new Error('Shop ID is required')
      const response = await fetch(`${API_BASE_URL}/shop/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch shop')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Payment mutation - FIXED VERSION
export const useShopPayment = (accessToken?: string) => {
  return useMutation<
    PaymentResponse,
    Error,
    { shopId: string; data: PaymentRequestData }
  >({
    mutationFn: async ({ shopId, data }) => {
      if (!accessToken) {
        throw new Error('Unauthorized')
      }

      const response = await fetch(`${API_BASE_URL}/shop/pay/${shopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Payment failed')
      }

      return response.json()
    },
  })
}
