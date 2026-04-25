'use client'

import { useQuery } from '@tanstack/react-query'
import { getContents } from '@/lib/api/contentApi'
import ArticleCard from '@/components/content/articleCard'
import YoutubeCard from '@/components/content/youtubeCard'
import SpotifyCard from '@/components/content/spotifyCard'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

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
      <section className="py-8 lg:py-12">
        <div className="mb-8">
          <Skeleton className="h-3 w-28 mb-2 bg-[#222]" />
          <Skeleton className="h-7 w-48 bg-[#1e1e1e]" />
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
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1">
            CURATED FOR YOU
          </span>
          <h2 className="text-[22px] font-bold text-[#F5F5F7] tracking-[-0.02em]">
            Latest Updates
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {latestContent?.map((item, index) => (
          <motion.div
            key={item._id}
            className="h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            {item.contentType === 'article' && <ArticleCard item={item} />}
            {(item.contentType === 'youtube' ||
              item.contentType === 'Youtube-videos') && (
                <YoutubeCard item={item} />
              )}
            {(item.contentType === 'spotify' ||
              item.contentType === 'Spotify-audios') && (
                <SpotifyCard item={item} />
              )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
