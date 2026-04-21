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
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'ongoing':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'completed':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      default:
        return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-medium tracking-wider text-white">
            Exclusive Events
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Discover upcoming events and workshops
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-[#0f0f0f] border border-[#262626] p-6 space-y-4"
            >
              <div className="h-6 bg-[#1a1a1a] rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded w-5/6 animate-pulse" />
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
          <Calendar className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Failed to load events
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

  const events = data?.data || []
  const totalItems = data?.meta?.total || 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-medium tracking-wider text-white">
          Exclusive Events
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Discover {totalItems} amazing events and workshops
        </p>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No events found
          </h3>
          <p className="text-zinc-400">Check back later for upcoming events!</p>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <div
                key={event._id}
                className="group relative overflow-hidden rounded-lg bg-[#0f0f0f] border border-[#262626] p-6 transition-all hover:border-[#404040] hover:shadow-lg"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold uppercase rounded-full border ${getStatusColor(
                      event.status,
                    )}`}
                  >
                    {getStatusLabel(event.status)}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 pr-20 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>
                        {format(new Date(event.date), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>{format(new Date(event.date), 'hh:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(event._id)}
                    className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
                  >
                    <Eye className="h-4 w-4" />
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
