'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tag, Eye, Calendar } from 'lucide-react'

import { Pagination } from '@/components/common/pagination'

import { format } from 'date-fns'
import { useGetOffers } from '@/lib/api/events&offersApi'
import { OfferModal } from './offersModal'

const ITEMS_PER_PAGE = 9

export default function OffersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useGetOffers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  const handleViewDetails = (offerId: string) => {
    setSelectedOfferId(offerId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOfferId(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isOfferValid = (validUntil: string) => {
    return new Date(validUntil) > new Date()
  }

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1 block">EXCLUSIVE</span>
          <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#F5F5F7]">Exclusive Offers</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-[12px] bg-[#161616] border border-white/[0.07] overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-white/[0.05]" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-white/[0.06] rounded-full w-3/4" />
                <div className="h-3.5 bg-white/[0.04] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-8">
        <div className="text-center py-20">
          <Tag className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">Failed to load offers</h3>
          <p className="text-[14px] text-[#6E6E73] mb-4">Please try again later</p>
          <button
            onClick={() => refetch()}
            className="rounded-full border border-white/[0.12] px-6 py-2 text-[13px] text-[#9A9A9F] hover:text-[#F5F5F7] hover:border-white/[0.2] transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const offers = data?.data || []
  const totalItems = data?.meta?.total || 0

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1 block">EXCLUSIVE</span>
        <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#F5F5F7]">
          Exclusive Offers
        </h2>
        <p className="mt-1 text-[13px] text-[#6E6E73]">
          Discover {totalItems} amazing deals and discounts
        </p>
      </div>

      {/* Empty State */}
      {offers.length === 0 ? (
        <div className="text-center py-20">
          <Tag className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">No offers found</h3>
          <p className="text-[14px] text-[#6E6E73]">Check back later for amazing deals!</p>
        </div>
      ) : (
        <>
          {/* Offers Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {offers.map(offer => {
              const isValid = isOfferValid(offer.validUntil)
              return (
                <div
                  key={offer._id}
                  className="group relative overflow-hidden rounded-[12px] bg-[#161616] border border-white/[0.07] transition-all duration-[250ms] ease-apple hover:-translate-y-[2px] hover:border-white/[0.14]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={offer.thumbnail}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-3 right-3">
                      <div className="rounded-full bg-white text-black px-3 py-1">
                        <span className="text-[13px] font-bold">
                          {offer.discount}% OFF
                        </span>
                      </div>
                    </div>

                    {!isValid && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 text-[11px] font-medium uppercase rounded-full bg-white/[0.1] backdrop-blur-[4px] text-[#9A9A9F] border border-white/[0.12]">
                          Expired
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#F5F5F7] mb-1 line-clamp-2">
                        {offer.title}
                      </h3>
                      <p className="text-[13px] text-[#9A9A9F] line-clamp-2 leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[13px] text-[#9A9A9F]">
                      <Calendar className="h-3.5 w-3.5 text-[#6E6E73]" />
                      <span>
                        Valid until{' '}
                        {format(new Date(offer.validUntil), 'MMMM dd, yyyy')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewDetails(offer._id)}
                      className="w-full flex items-center justify-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-[13px] font-medium text-[#9A9A9F] hover:text-[#F5F5F7] hover:border-white/[0.2] transition-all duration-200 ease-apple"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </>
      )}

      {/* Modal */}
      <OfferModal
        offerId={selectedOfferId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
