'use client'

import Image from 'next/image'
import { X, ExternalLink, Music } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useModalStore } from '@/app/store/useModalStore'

export default function SpotifyModal() {
  const { spotifyModal, closeSpotifyModal } = useModalStore()
  const { isOpen, title, description, thumbnail, url } = spotifyModal

  if (!url && !isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeSpotifyModal}>
      <DialogContent className="max-w-2xl p-0 bg-[#111111] border border-white/[0.07] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeSpotifyModal}
          className="absolute top-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-[4px] p-2 hover:bg-white/10 transition-all duration-200 ease-apple border border-white/10"
        >
          <X className="w-4 h-4 text-[#86868B] hover:text-[#F5F5F7] transition-colors" />
        </button>

        {/* Thumbnail Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Simple dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/50 to-transparent" />

          {/* Spotify Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="w-7 h-7 bg-[#1DB954] rounded-full flex items-center justify-center shadow-lg">
              <Music className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4 bg-[#111111]">
          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-[20px] font-bold text-[#F5F5F7] leading-tight tracking-[-0.02em]">
              {title}
            </h2>
          </div>

          {/* Description */}
          {description && (
            <p className="text-[13px] text-[#6E6E73] leading-relaxed">
              {description}
            </p>
          )}

          {/* Open in Spotify Button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 w-full rounded-full bg-[#1DB954] px-6 py-3 text-[14px] font-semibold text-black hover:bg-[#1DB954]/85 transition-all duration-200 ease-apple"
          >
            <Music className="w-4 h-4" />
            <span>Open in Spotify</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 ease-apple group-hover:translate-x-1" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
