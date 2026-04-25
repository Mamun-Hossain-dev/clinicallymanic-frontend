'use client'

import { ContentItem } from '../../../types/content'
import { SectionTitle } from '../common/section-title'
import ContentCard from '../content/contentCard'
import { motion } from 'framer-motion'

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
        {contents.map((item, index) => (
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
    </section>
  )
}
