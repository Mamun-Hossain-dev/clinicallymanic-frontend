import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getContentById } from '@/lib/api/contentApi'
import Link from 'next/link'

import CategorySection from '@/components/sections/categorySection'
import ShopPage from '@/components/landing/shop-section'
import ExclusiveShopGate from '@/components/exclusiveShopGate'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getContentById(params.id)

  if (!article || article.contentType !== 'article') {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Back */}
      <div className="px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 bg-white/[0.08] text-[#86868B] text-[11px] font-medium rounded-full">
                  {article.category}
                </span>

                <div className="flex items-center gap-4 text-[#9A9A9F] text-[12px]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />5 min read
                  </span>
                </div>
              </div>

              <h1 className="text-[28px] md:text-[38px] font-bold mb-6 text-[#F5F5F7] tracking-[-0.02em] leading-tight">
                {article.title}
              </h1>
            </header>

            {/* Thumbnail */}
            <div className="relative h-[400px] mb-10 rounded-[12px] overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Article HTML Content */}
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.body || '' }}
            />
          </article>

          {/* Related Articles - Below Article */}
        </div>

        <div className="max-w-7xl mx-auto mt-16">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1 block">MORE LIKE THIS</span>
          <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#F5F5F7] mb-6">
            Related Articles
          </h3>
          <CategorySection category={article.category} itemsPerPage={6} />
        </div>

        {/* Shop Section - Only for Exclusive Subscribers */}
        <div className="mt-24">
          <ExclusiveShopGate>
            <ShopPage isHomePage={true} />
          </ExclusiveShopGate>
        </div>
      </div>
    </div>
  )
}
