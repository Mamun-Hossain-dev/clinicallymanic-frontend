'use client'

import Image from 'next/image'
import { Play, Share2, Youtube } from 'lucide-react'
import { ContentItem } from '../../../types/content'
import { useModalStore } from '@/app/store/useModalStore'

export default function YouTubeCard({ item }: { item: ContentItem }) {
  const openYouTubeModal = useModalStore(state => state.openYouTubeModal)

  return (
    <div
      className="group relative overflow-hidden rounded-[12px] bg-[#161616] border border-white/[0.07] transition-all duration-[250ms] ease-apple hover:-translate-y-[3px] hover:border-white/[0.14] flex flex-col h-full"
      onClick={() => openYouTubeModal(item.youtube?.videoId || '')}
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* YouTube badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <div className="w-6 h-6 bg-[#ff0000] rounded-full flex items-center justify-center shadow-lg">
            <Youtube className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
        </div>

        {/* Share */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button
            className="rounded-full bg-black/50 backdrop-blur-[2px] p-2 opacity-0 transition-all duration-[250ms] ease-apple hover:bg-white/20 group-hover:opacity-100 border border-white/15 hover:scale-110"
            onClick={e => {
              e.stopPropagation()
            }}
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5 text-white" />
          </button>
        </div>

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-apple">
          <div className="w-[44px] h-[44px] bg-black/50 backdrop-blur-[2px] border border-white/15 rounded-full flex items-center justify-center transition-transform duration-[250ms] ease-apple group-hover:scale-110 shadow-2xl">
            <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-[6px] py-[2px] bg-black/75 backdrop-blur-[4px] text-white text-[11px] font-medium rounded-[4px]">
            10:30
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 space-y-2 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="relative font-semibold leading-[1.4] text-[15px] line-clamp-2 text-[#F5F5F7] group-hover:text-white transition-colors duration-200 ease-apple">
          {item.title}
        </h3>

        {/* Description (lighter) */}
        {item?.description && (
          <p className="relative text-[13px] text-[#9A9A9F] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Meta */}
        <div className="relative flex items-center justify-between text-xs pt-0.5 mt-auto">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-white/[0.08] text-[#86868B] rounded-full text-[11px] font-medium">
              {item.category}
            </span>
            <span className="text-[#9A9A9F] text-[11px]">
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#6E6E73]">
            <Play className="w-3 h-3" fill="currentColor" />
            <span className="text-[11px] font-medium">100k</span>
          </div>
        </div>
      </div>
    </div>
  )
}
