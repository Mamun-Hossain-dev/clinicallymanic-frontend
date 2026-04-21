// components/offers/OfferModal.tsx
'use client'

import Image from 'next/image'
import { Calendar, Tag, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { format, differenceInDays } from 'date-fns'
import { useGetOfferById } from '@/lib/api/events&offersApi'

interface OfferModalProps {
  offerId: string | null
  isOpen: boolean
  onClose: () => void
}

export function OfferModal({ offerId, isOpen, onClose }: OfferModalProps) {
  const { data, isLoading, isError } = useGetOfferById(offerId)

  const offer = data?.data

  const isOfferValid = (validUntil?: string) => {
    if (!validUntil) return false
    return new Date(validUntil) > new Date()
  }

  const getDaysRemaining = (validUntil?: string) => {
    if (!validUntil) return 0
    return differenceInDays(new Date(validUntil), new Date())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0b0b] border-[#262626] text-white">
        {isLoading && (
          <div className="space-y-4 p-4">
            <div className="aspect-video bg-[#1a1a1a] rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 bg-[#1a1a1a] rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded w-5/6 animate-pulse" />
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load offer details</p>
          </div>
        )}

        {offer && (
          <div className="space-y-6">
            {/* Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
              <Image
                src={offer.thumbnail}
                alt={offer.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                quality={95}
              />

              {/* Discount Badge */}
              <div className="absolute top-4 right-4">
                <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {offer.discount}% OFF
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              {!isOfferValid(offer.validUntil) && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-gray-500/80 text-white text-sm"
                  >
                    Expired
                  </Badge>
                </div>
              )}

              {/* Close Button */}
              {/* <button
                onClick={onClose}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white leading-tight">
                  {offer.title}
                </DialogTitle>
              </DialogHeader>

              {/* Description */}
              <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Offer Details
                </h4>
                <p className="text-sm text-[#aaa] leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discount */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Tag className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Discount</p>
                    <p className="text-xl font-bold text-white">
                      {offer.discount}%
                    </p>
                  </div>
                </div>

                {/* Valid Until */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Valid Until</p>
                    <p className="text-sm font-medium text-white">
                      {format(new Date(offer.validUntil), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {/* Days Remaining */}
                {isOfferValid(offer.validUntil) && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-[#141414] border border-[#262626]">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-[#777]">Days Remaining</p>
                      <p className="text-xl font-bold text-white">
                        {getDaysRemaining(offer.validUntil)} days
                      </p>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#141414] border border-[#262626]">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      offer.status === 'active'
                        ? 'bg-green-500/10'
                        : 'bg-gray-500/10'
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${
                        offer.status === 'active'
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Status</p>
                    <p className="text-sm font-medium text-white capitalize">
                      {offer.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              {isOfferValid(offer.validUntil) && offer.status === 'active' && (
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6 text-center">
                  <p className="text-lg font-semibold text-white mb-2">
                    Limited Time Offer!
                  </p>
                  <p className="text-sm text-zinc-400">
                    Don&apos;t miss out on this amazing {offer.discount}%
                    discount. Offer valid for{' '}
                    {getDaysRemaining(offer.validUntil)} more days.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
