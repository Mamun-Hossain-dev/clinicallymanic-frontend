'use client'

import Image from 'next/image'
import { Play, Music } from 'lucide-react'
import { ContentItem } from '../../../types/content'
import { useModalStore } from '@/app/store/useModalStore'

export default function SpotifyCard({ item }: { item: ContentItem }) {
  const openSpotifyModal = useModalStore(state => state.openSpotifyModal)

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800/50 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col h-full"
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
      <div className="relative h-56 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

        {/* Spotify Badge - Top Left */}
        <div className="absolute top-4 left-4 flex items-center gap-2 backdrop-blur-md bg-black/40 rounded-full px-3 py-1.5 border border-white/10">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <Music className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-xs text-white font-semibold tracking-wide">
            Spotify
          </span>
        </div>

        {/* Play Button - Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-black ml-1" fill="black" />
          </div>
        </div>

        {/* Pulse Effect on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-emerald-500/30 rounded-full animate-ping" />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-5 space-y-2 flex-1 flex flex-col">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <h3 className="relative text-white font-semibold text-base line-clamp-2 group-hover:text-emerald-400 transition-colors duration-300">
          {item.title}
        </h3>

        <p className="relative text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Listen Now Hint */}
        <div className="relative flex items-center gap-2 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2 mt-auto">
          <span>Listen Now</span>
          <svg
            className="w-3 h-3 animate-bounce"
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
