'use client'

import { useState } from 'react'
import { Calendar, MapPin, Clock, Eye } from 'lucide-react'
import { useGetEvents } from '@/lib/api/events&offersApi'
import { Pagination } from '@/components/common/pagination'

import { format } from 'date-fns'
import { EventModal } from './eventModal'

const ITEMS_PER_PAGE = 9

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useGetEvents({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEventId(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-white/[0.08] text-[#9A9A9F] border-white/[0.12]'
      case 'ongoing':
        return 'bg-white/[0.1] text-[#F5F5F7] border-white/[0.2]'
      case 'completed':
        return 'bg-white/[0.05] text-[#6E6E73] border-white/[0.08]'
      default:
        return 'bg-white/[0.05] text-[#6E6E73] border-white/[0.08]'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1 block">EXCLUSIVE</span>
          <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#F5F5F7]">Exclusive Events</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-[12px] bg-[#161616] border border-white/[0.07] p-6 space-y-4 animate-pulse"
            >
              <div className="h-5 bg-white/[0.06] rounded-full w-3/4" />
              <div className="h-3.5 bg-white/[0.04] rounded-full" />
              <div className="h-3.5 bg-white/[0.04] rounded-full w-5/6" />
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
          <Calendar className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">Failed to load events</h3>
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

  const events = data?.data || []
  const totalItems = data?.meta?.total || 0

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#6E6E73] mb-1 block">EXCLUSIVE</span>
        <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#F5F5F7]">
          Exclusive Events
        </h2>
        <p className="mt-1 text-[13px] text-[#6E6E73]">
          Discover {totalItems} amazing events and workshops
        </p>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="h-14 w-14 text-[#333] mx-auto mb-5" />
          <h3 className="text-[18px] font-semibold text-[#F5F5F7] mb-2">No events found</h3>
          <p className="text-[14px] text-[#6E6E73]">Check back later for upcoming events!</p>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <div
                key={event._id}
                className="group relative overflow-hidden rounded-[12px] bg-[#161616] border border-white/[0.07] p-5 transition-all duration-[250ms] ease-apple hover:-translate-y-[2px] hover:border-white/[0.14]"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-medium uppercase rounded-full border ${getStatusColor(event.status)}`}
                  >
                    {getStatusLabel(event.status)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#F5F5F7] mb-1.5 pr-20 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-[13px] text-[#9A9A9F] line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-[13px] text-[#9A9A9F]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#6E6E73]" />
                      <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#6E6E73]" />
                      <span>{format(new Date(event.date), 'hh:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#6E6E73]" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(event._id)}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-[13px] font-medium text-[#9A9A9F] hover:text-[#F5F5F7] hover:border-white/[0.2] transition-all duration-200 ease-apple"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
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
      <EventModal
        eventId={selectedEventId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
