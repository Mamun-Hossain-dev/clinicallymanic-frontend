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
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
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
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
                  {article.category}
                </span>

                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />5 min read
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                {article.title}
              </h1>
            </header>

            {/* Thumbnail */}
            <div className="relative h-[420px] mb-10 rounded-xl overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
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
          <h3 className="text-2xl font-bold mb-6 text-white">
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
