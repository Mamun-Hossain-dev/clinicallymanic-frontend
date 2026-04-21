import React from 'react'
import SingleBanner from '@/components/landing/singleBanner'
import ModalManager from '@/components/modals/modalManager'
import CategorySection from '@/components/sections/categorySection'

export default async function Page() {
  return (
    <div className="flex flex-col gap-10">
      {/* Banner */}
      <SingleBanner type="fashion" />

      {/* Category Sections */}
      <div className="space-y-12">
        <CategorySection category="fashion" itemsPerPage={12} />
      </div>

      {/* Modal Manager */}
      <ModalManager />
    </div>
  )
}
