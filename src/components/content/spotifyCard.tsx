'use client'

import Image from 'next/image'
import { Play, Music } from 'lucide-react'
import { ContentItem } from '../../../types/content'
import { useModalStore } from '@/app/store/useModalStore'

export default function SpotifyCard({ item }: { item: ContentItem }) {
  const openSpotifyModal = useModalStore(state => state.openSpotifyModal)

  return (
    <div
      className="group relative overflow-hidden rounded-[12px] bg-[#161616] border border-white/[0.07] transition-all duration-[250ms] ease-apple hover:-translate-y-[3px] hover:border-white/[0.14] flex flex-col h-full"
      onClick={() =>
        openSpotifyModal({
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          url: item.spotify?.url ?? '',
        })
      }
    >
      {/* Thumbnail Section */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Spotify Badge - Top Left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <div className="w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
            <Music className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Play Button - Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-apple">
          <div className="w-[44px] h-[44px] bg-black/50 backdrop-blur-[2px] border border-white/15 rounded-full flex items-center justify-center transition-transform duration-[250ms] ease-apple group-hover:scale-110 shadow-2xl">
            <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-4 space-y-2 flex-1 flex flex-col">
        <h3 className="relative font-semibold leading-[1.4] text-[15px] line-clamp-2 text-[#F5F5F7] group-hover:text-white transition-colors duration-200 ease-apple">
          {item.title}
        </h3>

        <p className="relative text-[13px] text-[#9A9A9F] line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Listen Now Hint */}
        <div className="relative flex items-center gap-1.5 text-[#86868B] text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2 mt-auto">
          <span>Listen Now</span>
          <svg
            className="w-3 h-3 transition-transform duration-200 ease-apple group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
