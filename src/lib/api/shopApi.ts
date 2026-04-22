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

type BackendShop = {
  id: string
  name: string
  title: string
  description: string
  imageUrls: string[]
  sizes: string[]
  price: number | string
  type: string
  status: string
  details?: string | null
  createdById?: string
  createdAt: string
  updatedAt: string
  categories?: string[]
}

const normalizeShop = (shop: BackendShop): Shop => ({
  _id: shop.id,
  name: shop.name,
  title: shop.title,
  description: shop.description,
  images: shop.imageUrls || [],
  size: shop.sizes || [],
  price: Number(shop.price),
  type: shop.type.toLowerCase(),
  status: shop.status.toLowerCase() as Shop['status'],
  details: shop.details || '',
  createdBy: shop.createdById || '',
  createdAt: shop.createdAt,
  updatedAt: shop.updatedAt,
  categories: shop.categories?.map(category => category.toLowerCase()) || [],
})

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

const normalizeShopTypeParam = (type?: string) => {
  if (!type) return undefined

  const normalized = type.trim().toLowerCase()
  if (normalized === 'exclusive') return 'EXCLUSIVE'
  if (normalized === 'standard') return 'STANDARD'

  return undefined
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
      if (categories) queryParams.append('category', categories)
      const normalizedType = normalizeShopTypeParam(type)
      if (normalizedType) {
        queryParams.append('type', normalizedType)
      }
      if (sortBy) queryParams.append('sortBy', sortBy)
      if (sortOrder) queryParams.append('sortOrder', sortOrder)

      const response = await fetch(
        `${API_BASE_URL}/shop/products?${queryParams.toString()}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch shops')
      }
      const result = (await response.json()) as ShopResponse & {
        data: BackendShop[]
      }
      return {
        ...result,
        data: result.data.map(normalizeShop),
      }
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
      const response = await fetch(`${API_BASE_URL}/shop/products/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch shop')
      }
      const result = await response.json()
      return {
        ...result,
        data: normalizeShop(result.data as BackendShop),
      }
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

      const response = await fetch(`${API_BASE_URL}/shop/products/${shopId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          customerName: data.name,
          customerPhone: data.phone,
          customerEmail: data.email,
          deliveryLocation: data.location,
          size: data.size,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Payment failed')
      }

      return response.json()
    },
  })
}
