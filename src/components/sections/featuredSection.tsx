'use client'

import { ContentItem } from '@/../types/content'
import { SectionTitle } from '../common/section-title'
import ContentCard from '../content/contentCard'

interface FeaturedSectionProps {
  contents: ContentItem[]
}

export default function FeaturedSection({ contents }: FeaturedSectionProps) {
  if (!contents.length) return null

  return (
    <section className="mb-12">
      <SectionTitle>Featured</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((item, index) => (
          <ContentCard
            key={item._id}
            item={item}
            variant={index === 0 ? 'featured' : 'default'}
          />
        ))}
      </div>
    </section>
  )
}
