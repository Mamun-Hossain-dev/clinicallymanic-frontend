// lib/api/content.ts

import {
  ContentItem,
  ApiResponse,
  ApiContentItem,
  normalizeContentItem,
  CategoryType,
  ContentType,
} from '@/../types/content'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'

// Generic fetch helper
async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store', // Ensure fresh data
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// GET CONTENTS
export async function getContents(params?: {
  category?: CategoryType
  contentType?: ContentType
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}): Promise<ApiResponse<ContentItem>> {
  const queryParams = new URLSearchParams()

  if (params?.category) queryParams.append('category', params.category)
  if (params?.contentType) queryParams.append('contentType', params.contentType)
  if (params?.limit) queryParams.append('limit', params.limit.toString())
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)

  const url = `${API_BASE}/contents?${queryParams.toString()}`

  const response = await fetchAPI<ApiResponse<ApiContentItem>>(url)
  const normalizedData = response.data.map(normalizeContentItem)

  return {
    ...response,
    data: normalizedData,
  }
}

// GET SINGLE CONTENT
export async function getContentById(id: string): Promise<ContentItem> {
  const url = `${API_BASE}/contents/${id}`
  const response = await fetchAPI<{ data: ApiContentItem }>(url)
  return normalizeContentItem(response.data)
}

// GET FEATURED CONTENTS
export async function getFeaturedContents(): Promise<ContentItem[]> {
  const res = await getContents({
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
  return res.data
}

// GET LATEST POSTS
export async function getLatestPosts(): Promise<ContentItem[]> {
  const res = await getContents({
    contentType: 'article',
    limit: 8,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
  return res.data
}

// GET MUSIC CONTENTS (YouTube + Spotify)
export async function getMusicContents(): Promise<ContentItem[]> {
  const res = await getContents({
    category: 'playLists',
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  return res.data.filter(
    item =>
      item.contentType === 'youtube' ||
      item.contentType === 'spotify' ||
      item.contentType === 'Youtube-videos' ||
      item.contentType === 'Spotify-audios' ||
      item.youtube ||
      item.spotify,
  )
}

// GET CONTENTS BY CATEGORY
export async function getContentsByCategory(
  category: CategoryType,
  limit = 8,
): Promise<ContentItem[]> {
  const res = await getContents({
    category,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
  return res.data
}

// SEARCH CONTENTS
export async function searchContents(
  searchTerm: string,
): Promise<ContentItem[]> {
  const queryParams = new URLSearchParams()
  queryParams.append('searchTerm', searchTerm)

  const url = `${API_BASE}/contents?${queryParams.toString()}`
  const response = await fetchAPI<ApiResponse<ApiContentItem>>(url)

  return response.data.map(normalizeContentItem)
}
