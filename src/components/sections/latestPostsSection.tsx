'use client'

import { ContentItem } from '../../../types/content'
import { SectionTitle } from '../common/section-title'
import ContentCard from '../content/contentCard'

interface LatestPostsSectionProps {
  contents: ContentItem[]
}

export default function LatestPostsSection({
  contents,
}: LatestPostsSectionProps) {
  if (!contents.length) return null

  return (
    <section className="mb-12">
      <SectionTitle>Latest Posts</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map(item => (
          <ContentCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  )
}
