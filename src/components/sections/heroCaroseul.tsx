'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { fetchBanners, Banner } from '@/lib/api/bannerApi'
import { BannerSkeleton } from '../landing/bannerSkeleton'
import { useUserStore } from '@/app/store/useUserProfileStore'

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
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useUserStore()

  console.log('user from store', user)

  // Fetch banners from API
  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true)
        const response = await fetchBanners()
        // Filter only active banners
        const activeBanners = response.data.filter(
          banner => banner.status === 'active',
        )
        setBanners(activeBanners)
      } catch (error) {
        console.error('Failed to load banners:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBanners()
  }, [])

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

  if (loading) {
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
                <Link href={bannerRoute} className="block h-full w-full">
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
                        'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)',
                    }}
                  />

                  {/* Text with fade animation */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${idx === currentSlide
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                      }`}
                  >
                    <div className="text-center px-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-100 animate-fade-in-up">
                        {banner.type}
                      </p>
                      <h3 className="text-2xl md:text-5xl font-bold text-white animate-fade-in-up animation-delay-150">
                        {banner.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base text-zinc-200 animate-fade-in-up animation-delay-300">
                        {banner.description}
                      </p>

                      {/* Explore Button - Glassy */}
                      <div className="mt-6 animate-fade-in-up animation-delay-450 hidden md:block">
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg">
                          Explore Now
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
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
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide
                    ? 'w-7 bg-white'
                    : 'w-3 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Thumbnails with hover animation (smaller width) ===== */}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8 justify-center items-center">
        {banners.map((banner, idx) => {
          const bannerRoute = getBannerRoute(banner.type)

          return (
            <Link
              key={banner._id}
              href={bannerRoute}
              onClick={() => goToSlide(idx)}
              className={`relative aspect-[12/5] cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${idx === currentSlide
                  ? 'ring-2 ring-white scale-105'
                  : 'ring-1 ring-zinc-700 hover:ring-zinc-500 hover:scale-105'
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
                <p className="px-2 text-xs font-semibold text-white text-center">
                  {banner.type}
                </p>
              </div>
            </Link>
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
