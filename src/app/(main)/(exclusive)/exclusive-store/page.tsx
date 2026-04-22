// import HeroCarousel from '@/components/landing/heroCaroseul'
import ShopSection from '@/components/landing/shop-section'
// import SingleBanner from '@/components/landing/singleBanner'
import React, { Suspense } from 'react'

export default function FashionPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* <HeroCarousel /> */}
      {/* <SingleBanner type="fashion" /> */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-medium tracking-wider text-white">
                Exclusive Collection
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-zinc-800 rounded-md mb-4"></div>
                  <div className="h-4 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <ShopSection title="Exclusive Collection" />
      </Suspense>
    </div>
  )
}
