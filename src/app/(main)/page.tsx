import dynamic from 'next/dynamic'
import ExclusiveShopGate from '@/components/exclusiveShopGate'
import HeroCarousel from '@/components/sections/heroCaroseul'
import LatestContent from '@/components/sections/latest-content'

const sectionLoading = (
  <section className="space-y-6">
    <div className="h-8 w-48 rounded bg-zinc-900 animate-pulse" />
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[320px] rounded-xl bg-zinc-900 animate-pulse"
        />
      ))}
    </div>
  </section>
)

const shopLoading = (
  <div className="space-y-6">
    <div className="h-8 w-48 rounded bg-zinc-900 animate-pulse" />
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[4/5] rounded-xl bg-zinc-900 animate-pulse"
        />
      ))}
    </div>
  </div>
)

const MusicSection = dynamic(() => import('@/components/sections/musicSection'), {
  loading: () => sectionLoading,
})

const CategorySection = dynamic(
  () => import('@/components/sections/categorySection'),
  {
    loading: () => sectionLoading,
  },
)

const ShopPage = dynamic(() => import('@/components/landing/shop-section'), {
  loading: () => shopLoading,
})

const ModalManager = dynamic(() => import('@/components/modals/modalManager'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="mb-8">
        <HeroCarousel />
      </section>

      <div className="py-8 space-y-20">
        {/* Latest Content Section - descending sort order */}
        <LatestContent />

        {/* Music Section with Pagination */}
        <MusicSection itemsPerPage={12} showPagination={true} />

        {/* Category Sections with Pagination */}
        <CategorySection
          category="news"
          itemsPerPage={8}
          showPagination={true}
        />
        <CategorySection
          category="sports"
          itemsPerPage={8}
          showPagination={true}
        />
        <CategorySection
          category="art"
          itemsPerPage={8}
          showPagination={true}
        />
        <CategorySection
          category="fashion"
          itemsPerPage={8}
          showPagination={true}
        />
      </div>
      {/* Shop Section */}
      <div className="mt-24">
        <ExclusiveShopGate>
          <ShopPage isHomePage={true} />
        </ExclusiveShopGate>
      </div>

      {/* Modal Manager */}
      <ModalManager />
    </div>
  )
}
