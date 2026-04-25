'use client'

import { ContentItem } from '@/../types/content'
import { SectionTitle } from '../common/section-title'
import ContentCard from '../content/contentCard'
import { motion } from 'framer-motion'

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
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
          >
            <ContentCard
              item={item}
              variant={index === 0 ? 'featured' : 'default'}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
