'use client'

import Image from 'next/image'
import { Play, Share2, Youtube } from 'lucide-react'
import { ContentItem } from '../../../types/content'
import { useModalStore } from '@/app/store/useModalStore'

export default function YouTubeCard({ item }: { item: ContentItem }) {
  const openYouTubeModal = useModalStore(state => state.openYouTubeModal)

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/40 border border-zinc-800/50 hover:border-red-500/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 flex flex-col h-full"
      onClick={() => openYouTubeModal(item.youtube?.videoId || '')}
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* YouTube badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 backdrop-blur-md bg-black/40 rounded-full px-2.5 py-1 border border-white/10">
          <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <Youtube className="w-3 h-3 text-white" fill="white" />
          </div>
          <span className="text-[11px] text-white font-semibold tracking-wide">
            YouTube
          </span>
        </div>

        {/* Share */}
        <div className="absolute top-3 right-3 z-10">
          <button
            className="rounded-full bg-black/60 backdrop-blur-sm p-2 opacity-0 transition-all duration-300 hover:bg-red-600 group-hover:opacity-100 border border-white/10 hover:scale-110"
            onClick={e => {
              e.stopPropagation()
            }}
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5 text-white" />
          </button>
        </div>

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Pulse */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-red-600/30 rounded-full animate-ping" />
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2 py-0.5 bg-black/90 backdrop-blur-sm text-white text-[11px] font-semibold rounded border border-white/10">
            10:30
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 space-y-2 flex-1 flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Title */}
        <h3 className="relative font-semibold text-base line-clamp-2 group-hover:text-red-500 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description (lighter) */}
        {item?.description && (
          <p className="relative text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Meta */}
        <div className="relative flex items-center justify-between text-xs pt-0.5 mt-auto">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-zinc-800/80 backdrop-blur-sm text-zinc-300 rounded-full text-[11px] font-medium border border-zinc-700/50">
              {item.category}
            </span>
            <span className="text-zinc-500 text-[11px]">
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Play className="w-3 h-3" fill="currentColor" />
            <span className="text-[11px] font-medium">100k</span>
          </div>
        </div>
      </div>
    </div>
  )
}
