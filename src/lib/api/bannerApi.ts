const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface Banner {
  _id: string
  title: string
  description: string
  image: string
  type: string
  status: string
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

// Fetch all banners or filter by type
export const fetchBanners = async (type?: string): Promise<BannerResponse> => {
  const url = type
    ? `${API_URL}/banner?type=${encodeURIComponent(type)}`
    : `${API_URL}/banner`

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

  return res.json()
}
