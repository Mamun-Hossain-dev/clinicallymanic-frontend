'use client'

import { useQuery } from '@tanstack/react-query'
import { Banner, fetchBanners } from '@/lib/api/bannerApi'

const normalizeBannerCategory = (value?: string) =>
  value?.trim().toLowerCase()

export const useBanners = () =>
  useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await fetchBanners()
      return response.data.filter(banner => banner.status === 'active')
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  })

export const useBannerByType = (type: string) =>
  useQuery<Banner | null>({
    queryKey: ['banner', type],
    queryFn: async () => {
      const response = await fetchBanners(type)
      return (
        response.data.find(
          banner =>
            banner.status === 'active' &&
            normalizeBannerCategory(banner.type) ===
              normalizeBannerCategory(type),
        ) || null
      )
    },
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  })
