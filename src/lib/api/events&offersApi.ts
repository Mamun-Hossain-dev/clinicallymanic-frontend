// lib/api/eventsOffersApi.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Event Interfaces
export interface Event {
  _id: string
  title: string
  description: string
  location: string
  status: 'upcoming' | 'ongoing' | 'completed'
  date: string
  createdBy: {
    _id: string
    email: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface EventsResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    page: number
    limit: number
    total: number
  }
  data: Event[]
}

// Offer Interfaces
export interface Offer {
  _id: string
  thumbnail: string
  title: string
  description: string
  discount: number
  validUntil: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  __v: number
}

export interface OffersResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Offer[]
}

// Get all events
interface UseGetEventsParams {
  page?: number
  limit?: number
}

export const useGetEvents = ({ page = 1, limit = 10 }: UseGetEventsParams) => {
  return useQuery<EventsResponse>({
    queryKey: ['events', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/event?page=${page}&limit=${limit}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      return response.json()
    },
    placeholderData: keepPreviousData,
  })
}

// Get single event by ID
export const useGetEventById = (id: string | null) => {
  return useQuery<{
    statusCode: number
    success: boolean
    message: string
    data: Event
  }>({
    queryKey: ['event', id],
    queryFn: async () => {
      if (!id) throw new Error('Event ID is required')
      const response = await fetch(`${API_BASE_URL}/event/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch event')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

// Get all offers
interface UseGetOffersParams {
  page?: number
  limit?: number
}

export const useGetOffers = ({ page = 1, limit = 10 }: UseGetOffersParams) => {
  return useQuery<OffersResponse>({
    queryKey: ['offers', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/offer?page=${page}&limit=${limit}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch offers')
      }
      return response.json()
    },
    placeholderData: keepPreviousData,
  })
}

// Get single offer by ID
export const useGetOfferById = (id: string | null) => {
  return useQuery<{
    statusCode: number
    success: boolean
    message: string
    data: Offer
  }>({
    queryKey: ['offer', id],
    queryFn: async () => {
      if (!id) throw new Error('Offer ID is required')
      const response = await fetch(`${API_BASE_URL}/offer/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch offer')
      }
      return response.json()
    },
    enabled: !!id,
  })
}
