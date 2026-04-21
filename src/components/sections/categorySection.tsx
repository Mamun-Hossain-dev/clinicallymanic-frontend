// components/sections/categorySection.tsx
'use client'

import { useState } from 'react'
import { CategoryType } from '@/../types/content'

import ContentCard from '@/components/content/contentCard'
import { SectionTitle } from '@/components/common/section-title'

import { PackageOpen } from 'lucide-react'
import ContentLoading from '../content-loading-state'
import ContentError, { EmptyState } from '../error/content-error'
import { Pagination } from '../common/pagination'
import { useCategoryContents } from '@/hooks/useContents'

interface CategorySectionProps {
  category: CategoryType
  initialPage?: number
  itemsPerPage?: number
  showPagination?: boolean
}

const categoryTitles: Record<CategoryType, string> = {
  news: 'Latest News',
  music: 'Trending Music',
  sports: 'Sports Highlights',
  art: 'Art & Creativity',
  fashion: 'Fashion Trends',
  playLists: 'Featured Playlists',
}

export default function CategorySection({
  category,
  initialPage = 1,
  itemsPerPage = 8,
  showPagination = true,
}: CategorySectionProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const { data, meta, isLoading, isError, refetch } = useCategoryContents(
    category,
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
        <SectionTitle link={`/${category}`} linkText="View All">
          {categoryTitles[category]}
        </SectionTitle>
        <ContentLoading count={itemsPerPage} />
      </section>
    )
  }

  // Error state
  if (isError) {
    return (
      <section className="space-y-6">
        <SectionTitle link={`/${category}`} linkText="View All">
          {categoryTitles[category]}
        </SectionTitle>
        <ContentError
          title="Failed to load content"
          message={`Unable to fetch ${category} content. Please try again.`}
          onRetry={refetch}
        />
      </section>
    )
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <section className="space-y-6">
        <SectionTitle link={`/${category}`} linkText="View All">
          {categoryTitles[category]}
        </SectionTitle>
        <EmptyState
          title="No content available"
          description={`There are no ${category} items available at this time.`}
          icon={PackageOpen}
        />
      </section>
    )
  }

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <SectionTitle link={`/${category}`} linkText="View All">
        {categoryTitles[category]}
      </SectionTitle>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(item => (
          <ContentCard key={item._id} item={item} />
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
