'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

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
          'group relative overflow-hidden rounded-[12px] bg-[#161616] border border-white/[0.07] transition-all duration-[250ms] ease-apple hover:-translate-y-[3px] hover:border-white/[0.14] flex flex-col h-full',
          variant === 'featured' && 'col-span-2',
          variant === 'compact' && 'flex gap-4',
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            'relative overflow-hidden',
            variant === 'compact' ? 'w-40 h-36' : 'h-52',
          )}
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-0.5 bg-white/[0.08] text-[#86868B] text-[11px] font-medium rounded-full">
              {item.category}
            </span>
          </div>

          {/* Read time */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="px-[6px] py-[2px] bg-black/75 backdrop-blur-[4px] rounded-[4px]">
              <span className="text-[11px] font-medium text-[#F5F5F7]">
                10:30
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn('p-4 flex-1 flex flex-col', variant === 'compact' && 'flex-1')}>
          <h3
            className={cn(
              'font-semibold leading-[1.4] mb-2 line-clamp-2 text-[#F5F5F7] group-hover:text-white transition-colors duration-200 ease-apple',
              variant === 'featured' ? 'text-[22px]' : 'text-[15px]',
            )}
          >
            {item.title}
          </h3>

          {/* ✅ Plain text preview (HTML stripped) */}
          {previewText && variant !== 'compact' && (
            <p className="text-[#9A9A9F] text-[13px] leading-[1.65] mb-4 line-clamp-3 pl-3 border-l border-white/[0.12] italic">
              {previewText}
            </p>
          )}

          <div className="flex items-center justify-between gap-3 text-xs mt-auto">
            <span className="flex items-center gap-2 text-[#9A9A9F] text-[11px]">
              <Calendar className="h-3 w-3" />
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
