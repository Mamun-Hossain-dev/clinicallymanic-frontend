'use client'

import { useState } from 'react'

import ContentCard from '@/components/content/contentCard'
import { SectionTitle } from '@/components/common/section-title'

import { Music } from 'lucide-react'
import ContentError, { EmptyState } from '../error/content-error'
import { Pagination } from '../common/pagination'
import ContentLoading from '../content-loading-state'
import { useMusicContents } from '@/hooks/useContents'
import { motion } from 'framer-motion'

interface MusicSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents?: any
  initialPage?: number
  itemsPerPage?: number
  showPagination?: boolean
}

export default function MusicSection({
  initialPage = 1,
  itemsPerPage = 12,
  showPagination = true,
}: MusicSectionProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const { data, meta, isLoading, isError, refetch } = useMusicContents(
    currentPage,
    itemsPerPage,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="space-y-6">
        <SectionTitle>Trending Music</SectionTitle>
        <ContentLoading count={itemsPerPage} />
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="space-y-6">
        <SectionTitle>Trending Music</SectionTitle>
        <ContentError
          title="Failed to load music"
          message="Unable to fetch music content. Please try again."
          onRetry={refetch}
        />
      </section>
    )
  }

  // Filter only YouTube and Spotify
  const musicItems = data.filter(
    item =>
      item.contentType === 'youtube' ||
      item.contentType === 'spotify' ||
      item.youtube ||
      item.spotify,
  )

  // Empty state
  if (musicItems.length === 0) {
    return (
      <section className="space-y-6">
        <SectionTitle>Trending Music</SectionTitle>
        <EmptyState
          title="No music available"
          description="There are no music items available at this time."
          icon={Music}
        />
      </section>
    )
  }

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <SectionTitle link="/playlists" linkText="View All">
        Trending Music
      </SectionTitle>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {musicItems.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            <ContentCard item={item} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && meta.total > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={meta.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
    </section>
  )
}
