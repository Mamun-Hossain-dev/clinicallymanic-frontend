'use client'

import Image from 'next/image'
import { SectionTitle } from './common/section-title'

const featuredVideos = [
  { id: 1, title: 'How to Build Music Bass Remix in...', views: '521 view' },
  {
    id: 2,
    title: 'How to DJ Breakbeat for Beginners Hend...',
    views: '432K view',
  },
  { id: 3, title: 'How to Study Music DJ Remix Full Bass', views: '12M view' },
  { id: 4, title: 'MIXTAPE BREAKBEAT...', views: '1.6M view' },
  { id: 5, title: 'Mashups & Remixes of Popular Songs...', views: '1.7M view' },
]

export function FeaturedSection() {
  return (
    <div className="mb-12">
      <SectionTitle icon="Flame">Featured</SectionTitle>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {featuredVideos.map(video => (
          <div
            key={video.id}
            className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
          >
            {/* IMAGE BLOCK */}
            <div className="relative aspect-[9/16] w-44 overflow-hidden bg-muted">
              <Image
                src={`/featured-music.jpg`} // or dynamic: `/featured-music-${video.id}.jpg`
                alt={video.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="176px" // w-44 = 176px
              />

              {/* Hover Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Hover Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-full bg-red-500 p-4 transition-transform hover:scale-110">
                  <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Title + Views (bottom gradient) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-3">
              <p className="line-clamp-2 text-sm font-medium text-white">
                {video.title}
              </p>
              <p className="text-xs text-gray-300">{video.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
