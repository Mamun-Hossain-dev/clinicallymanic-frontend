// types/content.ts

export type ContentType =
  | 'article'
  | 'youtube'
  | 'spotify'
  | 'Youtube-videos'
  | 'Spotify-audios'

export type CategoryType =
  | 'news'
  | 'music'
  | 'sports'
  | 'art'
  | 'fashion'
  | 'playLists'

// API Response Types
export interface MediaData {
  videourl?: string
  url?: string
  previewurl?: string
  description?: string
}

export interface MediaItem {
  type: 'youtube' | 'spotify' | 'article'
  data: MediaData | string
  _id: string
}

export interface ApiContentItem {
  id: string
  category: CategoryType
  type: 'ARTICLE' | 'YOUTUBE' | 'SPOTIFY'
  title: string
  description?: string
  thumbnailUrl?: string | null
  body?: string | null
  videoUrl?: string | null
  audioUrl?: string | null
  createdBy?: {
    id: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T[]
}

// Frontend Types (normalized)
export interface ContentItem {
  _id: string
  category: CategoryType
  contentType: ContentType
  title: string
  description?: string
  thumbnail: string
  createdAt: string
  body?: string
  youtube?: {
    videoId: string
    videoUrl: string
    description?: string
  }
  spotify?: {
    url: string
    previewurl?: string
    description?: string
  }
}

// Helper function to extract YouTube video ID from URL
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

// Normalize API response to frontend format
export function normalizeContentItem(apiItem: ApiContentItem): ContentItem {
  const normalized: ContentItem = {
    _id: apiItem.id,
    category: apiItem.category,
    contentType:
      apiItem.type === 'ARTICLE'
        ? 'article'
        : apiItem.type === 'YOUTUBE'
          ? 'youtube'
          : 'spotify',
    title: apiItem.title,
    description: apiItem.description,
    thumbnail: apiItem.thumbnailUrl || '',
    createdAt: apiItem.createdAt,
  }

  if (apiItem.type === 'ARTICLE') {
    normalized.body = apiItem.body || apiItem.description
  } else if (apiItem.type === 'YOUTUBE' && apiItem.videoUrl) {
    const videoId = extractYouTubeVideoId(apiItem.videoUrl)
    if (videoId) {
      normalized.youtube = {
        videoId,
        videoUrl: apiItem.videoUrl,
        description: apiItem.description,
      }
    }
  } else if (apiItem.type === 'SPOTIFY' && apiItem.audioUrl) {
    normalized.spotify = {
      url: apiItem.audioUrl,
      previewurl: apiItem.audioUrl,
      description: apiItem.description,
    }
  }

  return normalized
}
