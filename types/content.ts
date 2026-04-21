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
  _id: string
  category: CategoryType
  contentType: ContentType
  title: string
  description?: string
  thumbnail: string
  media: MediaItem[]
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
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
    _id: apiItem._id,
    category: apiItem.category,
    contentType: apiItem.contentType,
    title: apiItem.title,
    description: apiItem.description,
    thumbnail: apiItem.thumbnail,
    createdAt: apiItem.createdAt,
  }

  // Process media array
  if (apiItem.media && apiItem.media.length > 0) {
    const media = apiItem.media[0]

    // Handle article content type
    if (media.type === 'article') {
      if (typeof media.data === 'object' && 'description' in media.data) {
        normalized.body = media.data.description
        normalized.contentType = 'article'
      }
    }

    // Handle YouTube content type
    else if (media.type === 'youtube') {
      if (typeof media.data === 'object' && 'videourl' in media.data) {
        const videoId = extractYouTubeVideoId(media.data.videourl || '')
        if (videoId) {
          normalized.youtube = {
            videoId,
            videoUrl: media.data.videourl || '',
            description: media.data.description,
          }
          normalized.contentType = 'youtube'
          normalized.description = media.data.description
        }
      }
    }

    // Handle Spotify content type
    else if (media.type === 'spotify') {
      if (typeof media.data === 'object') {
        normalized.spotify = {
          url: media.data.previewurl || media.data.url || '',
          previewurl: media.data.previewurl,
          description: media.data.description,
        }
        normalized.contentType = 'spotify'
        normalized.description = media.data.description
      }
    }
  }

  return normalized
}
