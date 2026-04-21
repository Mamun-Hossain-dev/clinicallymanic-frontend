'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye } from 'lucide-react'

import { cn } from '@/lib/utils'
import { stripHtml } from '@/lib/stripHtml'
import { ContentItem } from '../../../types/content'

interface ArticleCardProps {
  item: ContentItem
  variant?: 'default' | 'compact' | 'featured'
}

export default function ArticleCard({
  item,
  variant = 'default',
}: ArticleCardProps) {
  const previewText = stripHtml(item.body || '')

  return (
    <Link href={`/article/${item._id}`}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/30 flex flex-col h-full',
          variant === 'featured' && 'col-span-2',
          variant === 'compact' && 'flex gap-4',
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            'relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950',
            variant === 'compact' ? 'w-40 h-40' : 'h-56',
          )}
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

          {/* Category */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
              {item.category}
            </span>
          </div>

          {/* Read time */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
              <Eye className="h-3 w-3 text-zinc-300" />
              <span className="text-xs font-medium text-zinc-300">
                10 min read
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn('p-6 flex-1 flex flex-col', variant === 'compact' && 'flex-1')}>
          <h3
            className={cn(
              'font-bold mb-3 line-clamp-2 text-white group-hover:text-blue-400 transition-colors duration-300',
              variant === 'featured' ? 'text-2xl' : 'text-xl',
            )}
          >
            {item.title}
          </h3>

          {/* ✅ Plain text preview (HTML stripped) */}
          {previewText && variant !== 'compact' && (
            <p className="text-zinc-400 text-xs mb-4 line-clamp-2">
              {previewText}
            </p>
          )}

          <div className="flex items-center justify-between gap-3 text-xs mt-auto">
            <span className="flex items-center gap-2 text-zinc-500">
              <Calendar className="h-3 w-3" />
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>

            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
              Article
            </span>
          </div>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500 pointer-events-none" />
      </div>
    </Link>
  )
}
