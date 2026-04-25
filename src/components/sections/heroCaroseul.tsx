'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { BannerSkeleton } from '../landing/bannerSkeleton'
import { useBanners } from '@/hooks/useBanners'

// Map banner types to routes
const getBannerRoute = (type: string): string => {
  const typeMap: Record<string, string> = {
    events: '/events',
    'exclusive-store': '/exclusive-store',
    offers: '/offers',
    playlists: '/playlists',
    news: '/news',
    art: '/art',
    sports: '/sports',
    fashion: '/fashion',
  }

  const normalizedType = type.toLowerCase().trim()
  return typeMap[normalizedType] || '/'
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { data: banners = [], isLoading } = useBanners()

  // Auto-play functionality
  useEffect(() => {
    if (banners.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev + 1) % banners.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (isLoading) {
    return <BannerSkeleton />
  }

  if (banners.length === 0) {
    return null
  }

  return (
    <div className="">
      {/* ===== Main Carousel with Animation ===== */}
      <div className="group relative mb-4 overflow-hidden rounded-sm bg-zinc-900">
        <div className="relative aspect-[16/7] md:aspect-[16/4] lg:aspect-[16/4.5]">
          {/* Images with slide animation */}
          {banners.map((banner, idx) => {
            const bannerRoute = getBannerRoute(banner.type)

            return (
              <div
                key={banner._id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${idx === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : idx < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                  }`}
              >
                <div className="block h-full w-full">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    priority={idx === 0}
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-300 hover:scale-105"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                    }}
                  />

                  {/* Text with fade animation */}
                  <div
                    className={`absolute inset-0 flex items-center justify-start transition-all duration-700 ${idx === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                      }`}
                  >
                    <div className="text-left px-8 md:px-16 w-full max-w-7xl">
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 animate-fade-in-up">
                        {banner.type}
                      </p>
                      <h3 className="font-bold text-[#F5F5F7] tracking-[-0.02em] animate-fade-in-up animation-delay-150" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                        {banner.title}
                      </h3>
                      <p className="mt-3 text-[15px] text-white/60 max-w-[480px] animate-fade-in-up animation-delay-300">
                        {banner.description}
                      </p>

                      {/* Explore Button - Solid */}
                      <div className="mt-6 animate-fade-in-up animation-delay-450 hidden md:block">
                        <Link
                          href={bannerRoute}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/85 text-[14px] font-medium transition-all duration-200 ease-apple"
                        >
                          Explore Now
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 opacity-0 transition-all hover:bg-black/80 hover:scale-110 group-hover:opacity-100 disabled:cursor-not-allowed z-10"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 opacity-0 transition-all hover:bg-black/80 hover:scale-110 group-hover:opacity-100 disabled:cursor-not-allowed z-10"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 z-10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-[2px] rounded-full transition-all duration-300 ease-apple ${idx === currentSlide
                  ? 'w-[24px] bg-white'
                  : 'w-[20px] bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Thumbnails with hover animation (smaller width) ===== */}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8 justify-center items-center">
        {banners.map((banner, idx) => {
          return (
            <button
              key={banner._id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`relative aspect-[12/5] cursor-pointer overflow-hidden rounded-[10px] transition-all duration-200 ease-apple ${idx === currentSlide
                ? 'border-b-[2px] border-white scale-[1.03]'
                : 'hover:scale-[1.03]'
                }`}
            >
              <Image
                src={banner.image}
                alt={banner.type}
                fill
                sizes="(max-width: 768px) 25vw, 12.5vw"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />

              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${idx === currentSlide
                  ? 'bg-black/40'
                  : 'bg-black/50 hover:bg-black/40'
                  }`}
              >
                <p className="px-2 text-[11px] font-semibold text-white text-center uppercase tracking-[0.05em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {banner.type}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-450 {
          animation-delay: 0.45s;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
