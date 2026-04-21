// ==================== FILE: components/BannerSkeleton.tsx ====================
'use client'

import React from 'react'

export function BannerSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-6 h-9 w-64 bg-zinc-800 rounded"></div>

      {/* Main Carousel Skeleton */}
      <div className="relative mb-4 overflow-hidden rounded-sm bg-zinc-900">
        <div className="relative aspect-[16/5] bg-zinc-800"></div>
      </div>

      {/* Thumbnails Skeleton */}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="relative aspect-[16/10] overflow-hidden rounded-lg bg-zinc-800"
          ></div>
        ))}
      </div>
    </div>
  )
}

export function SingleBannerSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="relative overflow-hidden rounded-sm bg-zinc-900">
        <div className="relative aspect-[16/4] bg-zinc-800"></div>
      </div>
    </div>
  )
}
