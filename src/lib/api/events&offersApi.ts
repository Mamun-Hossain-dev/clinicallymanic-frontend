// lib/api/eventsOffersApi.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Event Interfaces
export interface Event {
  _id: string
  title: string
  description: string
  thumbnail?: string
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

type BackendEvent = {
  id: string
  title: string
  description: string
  location: string
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  date: string
  thumbnailUrl?: string | null
  createdBy?: {
    id: string
    email: string
  } | null
  createdAt: string
  updatedAt: string
}

type BackendOffer = {
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
  status: 'ACTIVE' | 'INACTIVE'
  thumbnailUrl?: string | null
  createdAt: string
  updatedAt: string
}

const normalizeEvent = (event: BackendEvent): Event => ({
  _id: event.id,
  title: event.title,
  description: event.description,
  location: event.location,
  status: event.status.toLowerCase() as Event['status'],
  date: event.date,
  thumbnail: event.thumbnailUrl || '',
  createdBy: {
    _id: event.createdBy?.id || '',
    email: event.createdBy?.email || '',
  },
  createdAt: event.createdAt,
  updatedAt: event.updatedAt,
  __v: 0,
})

const normalizeOffer = (offer: BackendOffer): Offer => ({
  _id: offer.id,
  thumbnail: offer.thumbnailUrl || '',
  title: offer.title,
  description: offer.description,
  discount: offer.discount,
  validUntil: offer.validUntil,
  status: offer.status.toLowerCase() as Offer['status'],
  createdAt: offer.createdAt,
  updatedAt: offer.updatedAt,
  __v: 0,
})

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
        `${API_BASE_URL}/events?page=${page}&limit=${limit}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const result = (await response.json()) as EventsResponse & {
        data: BackendEvent[]
      }
      return {
        ...result,
        data: result.data.map(normalizeEvent),
      }
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
      const response = await fetch(`${API_BASE_URL}/events/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch event')
      }
      const result = await response.json()
      return {
        ...result,
        data: normalizeEvent(result.data as BackendEvent),
      }
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
        `${API_BASE_URL}/offers?page=${page}&limit=${limit}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch offers')
      }
      const result = (await response.json()) as OffersResponse & {
        data: BackendOffer[]
      }
      return {
        ...result,
        data: result.data.map(normalizeOffer),
      }
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
      const response = await fetch(`${API_BASE_URL}/offers/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch offer')
      }
      const result = await response.json()
      return {
        ...result,
        data: normalizeOffer(result.data as BackendOffer),
      }
    },
    enabled: !!id,
  })
}
