import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getContents } from '@/lib/api/contentApi'
import { ContentItem, CategoryType, ContentType } from '@/../types/content'

interface UseContentsParams {
  category?: CategoryType
  contentType?: ContentType
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  enabled?: boolean
}

interface UseContentsReturn {
  data: ContentItem[]
  meta: {
    page: number
    limit: number
    total: number
  }
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

export function useContents(params: UseContentsParams = {}): UseContentsReturn {
  const { enabled = true, ...queryParams } = params

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['contents', queryParams],
    queryFn: () => getContents(queryParams),
    enabled,
    placeholderData: keepPreviousData, // pagination smooth
  })

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? {
      page: 1,
      limit: queryParams.limit ?? 10,
      total: 0,
    },
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  }
}

// -----------------------------
// Helper Hooks
// -----------------------------
export function useCategoryContents(
  category: CategoryType,
  page: number = 1,
  limit: number = 8,
) {
  return useContents({
    category,
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
}

export function useMusicContents(page: number = 1, limit: number = 12) {
  return useContents({
    category: 'music',
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
}

export function useLatestPosts(page: number = 1, limit: number = 8) {
  return useContents({
    contentType: 'article',
    page,
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
}
