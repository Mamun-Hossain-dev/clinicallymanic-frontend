'use client'

import { useQuery } from '@tanstack/react-query'
import { getContents } from '@/lib/api/contentApi'
import ArticleCard from '@/components/content/articleCard'
import YoutubeCard from '@/components/content/youtubeCard'
import SpotifyCard from '@/components/content/spotifyCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function LatestContent() {
  const { data: latestContent, isLoading } = useQuery({
    queryKey: ['latest-content'],
    queryFn: async () => {
      const response = await getContents({
        limit: 6,
        sortOrder: 'desc',
        sortBy: 'createdAt',
      })
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  })

  if (isLoading) {
    return (
      <section className="container mx-auto px-2 py-8 lg:py-12">
        <div className="mb-8 pl-4 border-l-4 border-zinc-800">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 lg:py-10">
      <div className="mb-8 pl-4 border-l-4 border-white">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Latest Updates
        </h2>
        <p className="mt-2 text-zinc-400">
          Discover the most recent news, videos, and music.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {latestContent?.map(item => (
          <div key={item._id} className="h-full">
            {item.contentType === 'article' && <ArticleCard item={item} />}
            {(item.contentType === 'youtube' ||
              item.contentType === 'Youtube-videos') && (
              <YoutubeCard item={item} />
            )}
            {(item.contentType === 'spotify' ||
              item.contentType === 'Spotify-audios') && (
              <SpotifyCard item={item} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
