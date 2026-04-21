'use client'

import Image from 'next/image'

import { SectionTitle } from '@/components/common/section-title'
import { ListMusic } from 'lucide-react'

const playlists = [
  { id: 1, name: 'Chill Vibes', videos: 24, image: '/featured-music.jpg' },
  { id: 2, name: 'Workout Mix', videos: 32, image: '/music-video.jpg' },
  { id: 3, name: 'Study Focus', videos: 18, image: '/music-video.jpg' },
  { id: 4, name: 'Party Hits', videos: 45, image: '/music-video.jpg' },
  { id: 5, name: 'Road Trip', videos: 28, image: '/music-video.jpg' },
  { id: 6, name: 'Sleep Well', videos: 15, image: '/music-video.jpg' },
  { id: 7, name: 'New Releases', videos: 52, image: '/music-video.jpg' },
  { id: 8, name: 'Throwback Classics', videos: 36, image: '/music-video.jpg' },
]

export default function PlaylistsPage() {
  return (
    <div className="p-6 md:p-8">
      <SectionTitle>All Playlists</SectionTitle>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            className="group cursor-pointer overflow-hidden rounded-lg bg-card transition-transform hover:scale-105"
          >
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <Image
                src={playlist.image}
                alt={playlist.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <ListMusic className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground">
                {playlist.videos} videos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
