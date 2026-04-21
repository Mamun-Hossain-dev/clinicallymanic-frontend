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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-medium tracking-wider text-white">
            Exclusive Offers
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Discover amazing deals and discounts
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-[#0f0f0f] border border-[#262626] overflow-hidden"
            >
              <div className="aspect-video bg-[#1a1a1a] animate-pulse" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-[#1a1a1a] rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <Tag className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Failed to load offers
          </h3>
          <p className="text-zinc-400 mb-4">Please try again later</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-zinc-800 px-6 py-2 transition-colors hover:bg-zinc-700"
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-medium tracking-wider text-white">
          Exclusive Offers
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Discover {totalItems} amazing deals and discounts
        </p>
      </div>

      {/* Empty State */}
      {offers.length === 0 ? (
        <div className="text-center py-20">
          <Tag className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No offers found
          </h3>
          <p className="text-zinc-400">Check back later for amazing deals!</p>
        </div>
      ) : (
        <>
          {/* Offers Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map(offer => {
              const isValid = isOfferValid(offer.validUntil)

              return (
                <div
                  key={offer._id}
                  className="group relative overflow-hidden rounded-lg bg-[#0f0f0f] border border-[#262626] transition-all hover:border-[#404040] hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <Image
                      src={offer.thumbnail}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2">
                        <span className="text-lg font-bold text-white">
                          {offer.discount}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {!isValid && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold uppercase rounded-full bg-gray-500/80 text-white">
                          Expired
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {offer.description}
                      </p>
                    </div>

                    {/* Valid Until */}
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>
                        Valid until{' '}
                        {format(new Date(offer.validUntil), 'MMMM dd, yyyy')}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(offer._id)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
                    >
                      <Eye className="h-4 w-4" />
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
