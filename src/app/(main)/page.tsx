// app/page.tsx
// import ShopPage from '@/components/landing/shop-section'
import ExclusiveShopGate from '@/components/exclusiveShopGate'
import ShopPage from '@/components/landing/shop-section'
import ModalManager from '@/components/modals/modalManager'
import CategorySection from '@/components/sections/categorySection'
import HeroCarousel from '@/components/sections/heroCaroseul'
import MusicSection from '@/components/sections/musicSection'
import LatestContent from '@/components/sections/latest-content'
// import { useUserStore } from '../store/useUserProfileStore'

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
