// ==================== FILE: components/SingleBanner.tsx ====================
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchBanners, Banner } from '@/lib/api/bannerApi'
import { SingleBannerSkeleton } from './bannerSkeleton'

interface SingleBannerProps {
  type: string
  showTitle?: boolean
}

export default function SingleBanner({ type }: SingleBannerProps) {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBanner = async () => {
      try {
        setLoading(true)
        const response = await fetchBanners(type)
        // Get first active banner of this type
        const activeBanner = response.data.find(
          b => b.status === 'active' && b.type === type,
        )
        setBanner(activeBanner || null)
      } catch (error) {
        console.error(`Failed to load ${type} banner:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadBanner()
  }, [type])

  if (loading) {
    return <SingleBannerSkeleton />
  }

  if (!banner) {
    return null
  }

  return (
    <div className="mb-8">
      {/* {showTitle && (
        <h2 className="mb-4 text-2xl font-medium tracking-wider text-white">
          {banner.type} Collection
        </h2>
      )} */}

      <div className="relative overflow-hidden rounded-sm bg-zinc-900">
        <div className="relative aspect-[16/7] md:aspect-[16/4]">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="mb-2 text-xs uppercase tracking-widest text-zinc-200">
                {banner.type}
              </p>
              <h3 className="text-2xl md:text-5xl font-bold text-white">
                {banner.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-zinc-200 max-w-2xl mx-auto">
                {banner.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
