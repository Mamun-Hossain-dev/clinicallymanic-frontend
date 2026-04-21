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
      <DialogContent className="max-w-2xl p-0 bg-zinc-950 border border-zinc-800/50 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeSpotifyModal}
          className="absolute top-4 right-4 z-20 rounded-full bg-black/80 backdrop-blur-sm p-2.5 hover:bg-black transition-all duration-200 border border-white/10 hover:border-emerald-500/50 group"
        >
          <X className="w-4 h-4 text-white group-hover:text-emerald-400 transition-colors" />
        </button>

        {/* Thumbnail Section */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />

          {/* Spotify Logo Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-3 backdrop-blur-md bg-black/60 rounded-full px-4 py-2 border border-white/20">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm text-white font-bold tracking-wide">
              Spotify
            </span>
          </div>

          {/* Animated Soundwave Decoration */}
          <div className="absolute bottom-6 left-6 flex items-end gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-emerald-500 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-8 space-y-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {title}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" />
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-zinc-400 leading-relaxed">
              {description}
            </p>
          )}

          {/* Open in Spotify Button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-base font-semibold text-black hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Music className="w-5 h-5" />
            <span>Open in Spotify</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
          </a>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
