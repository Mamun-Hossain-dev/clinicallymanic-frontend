// ==================== FILE: components/SingleBanner.tsx ====================
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SingleBannerSkeleton } from './bannerSkeleton'
import { useBannerByType } from '@/hooks/useBanners'

interface SingleBannerProps {
  type: string
  showTitle?: boolean
}

export default function SingleBanner({ type }: SingleBannerProps) {
  const { data: banner, isLoading } = useBannerByType(type)

  if (isLoading) {
    return <SingleBannerSkeleton />
  }

  if (!banner) {
    return null
  }

  return (
    <div className="mb-8">
      <div className="group relative overflow-hidden rounded-sm bg-zinc-900">
        <div className="relative aspect-[16/7] md:aspect-[16/4] lg:aspect-[16/4.5]">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Cinematic left-to-right gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            }}
          />

          {/* Content — left aligned, cinematic */}
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="text-left px-8 md:px-16 w-full max-w-7xl">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">
                {banner.type}
              </p>
              <h3
                className="font-bold text-[#F5F5F7] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                {banner.title}
              </h3>
              {banner.description && (
                <p className="mt-3 text-[15px] text-white/60 max-w-[480px]">
                  {banner.description}
                </p>
              )}

              <div className="mt-6 hidden md:block">
                <Link
                  href={`/${type}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/85 text-[14px] font-medium transition-all duration-200 ease-apple"
                >
                  Explore {banner.type}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
