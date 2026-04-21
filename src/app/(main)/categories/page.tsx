'use client'

import { SectionTitle } from '@/components/common/section-title'

const categories = [
  'Music',
  'Entertainment',
  'Technology',
  'Education',
  'Fashion',
  'Sports',
  'Gaming',
  'Vlogging',
  'Travel',
  'Cooking',
  'Fitness',
  'Business',
  'Lifestyle',
  'Comedy',
  'News',
]

export default function CategoriesPage() {
  return (
    <div className="p-6 md:p-8">
      <SectionTitle>All Categories</SectionTitle>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map(category => (
          <div
            key={category}
            className="group cursor-pointer rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-center transition-transform hover:scale-105"
          >
            <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform">
              📺
            </div>
            <h3 className="mt-3 font-semibold text-white">{category}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
