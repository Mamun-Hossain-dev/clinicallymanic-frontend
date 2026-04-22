const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface Banner {
  _id: string
  title: string
  description: string
  image: string
  type: string
  status: 'active' | 'inactive'
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface BannerResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Banner[]
}

type BackendBanner = {
  id: string
  title: string
  description: string
  bannerImageUrl?: string | null
  category: string
  status: 'ACTIVE' | 'INACTIVE'
  createdById: string
  createdAt: string
  updatedAt: string
}

const normalizeBanner = (banner: BackendBanner): Banner => ({
  _id: banner.id,
  title: banner.title,
  description: banner.description,
  image: banner.bannerImageUrl || '',
  type: banner.category,
  status: banner.status.toLowerCase() as 'active' | 'inactive',
  createdBy: banner.createdById,
  createdAt: banner.createdAt,
  updatedAt: banner.updatedAt,
})

const normalizeBannerCategory = (value?: string) =>
  value?.trim().toLowerCase()

// Fetch all banners or filter by type
export const fetchBanners = async (type?: string): Promise<BannerResponse> => {
  const url = type
    ? `${API_URL}/banners?category=${encodeURIComponent(type)}`
    : `${API_URL}/banners`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // 👇 if using App Router (SSR / RSC)
    cache: 'no-store', // or next: { revalidate: 60 }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch banners: ${res.status}`)
  }

  const response = (await res.json()) as {
    statusCode: number
    success: boolean
    message: string
    meta: BannerResponse['meta']
    data: BackendBanner[]
  }

  return {
    ...response,
    data: response.data.map(normalizeBanner),
  }
}
