'use client'

import Image from 'next/image'
import { SectionTitle } from './common/section-title'
import { Button } from '@/components/ui/button'

const latestPosts = [
  {
    id: 1,
    title: 'How to Use Galaxy Z Folde Circle to Search Samsung',
    category: 'Technology',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '183K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
  {
    id: 2,
    title: 'Reviews Person Holding Silver and Black Laptop Computer',
    category: 'Trailer',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '245K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
  {
    id: 3,
    title: 'Reviews Meet the new MacBook Pro and Mac mini Apple',
    category: 'Technology',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '156K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
  {
    id: 4,
    title: 'How to Write a Business Plan Entrepreneurship Share To Tool',
    category: 'Technology',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '125K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
  {
    id: 5,
    title: 'MacBook Pro White Ceramic Mugand Black Smartphone on Table',
    category: 'Technology',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '89K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
  {
    id: 6,
    title: 'Reviews Samsung Galaxy S24 Ultra VS iPhone 15 Pro Max',
    category: 'Technology',
    author: 'Rian Seo',
    date: 'July 23, 2024',
    views: '342K',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy el...',
  },
]

export function LatestPostsSection() {
  return (
    <div className="mb-12">
      <SectionTitle>Latest Articles</SectionTitle>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map(post => (
          <article
            key={post.id}
            className="group cursor-pointer overflow-hidden rounded-lg bg-card transition-transform hover:scale-105"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              <div className="relative h-full w-full">
                <Image
                  src={`/post-.jpg`}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Date Badge */}
              <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                {post.date}
              </div>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {post.author} • {post.category}
                </span>
                <span>{post.views} views</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" size="lg">
          Show more
        </Button>
      </div>
    </div>
  )
}
