// components/events/EventModal.tsx
'use client'

import { Calendar, MapPin, Clock, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useGetEventById } from '@/lib/api/events&offersApi'
import { format } from 'date-fns'

interface EventModalProps {
  eventId: string | null
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ eventId, isOpen, onClose }: EventModalProps) {
  const { data, isLoading, isError } = useGetEventById(eventId)

  const event = data?.data

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      case 'ongoing':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
      case 'completed':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
      default:
        return 'bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20'
    }
  }

  const getStatusLabel = (status?: string) => {
    if (!status) return 'Unknown'
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0b0b0b] border-[#262626] text-white">
        {isLoading && (
          <div className="space-y-4 p-4">
            <div className="h-8 bg-[#1a1a1a] rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
            <div className="h-4 bg-[#1a1a1a] rounded w-5/6 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-4 bg-[#1a1a1a] rounded w-4/5 animate-pulse" />
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load event details</p>
          </div>
        )}

        {event && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <DialogHeader className="flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(event.status)}
                    >
                      {getStatusLabel(event.status)}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white leading-tight">
                    {event.title}
                  </DialogTitle>
                </div>
              </DialogHeader>
              {/* <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#1a1a1a] transition-colors flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>

            {/* Description */}
            <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
              <h4 className="text-sm font-semibold text-white mb-2">
                Description
              </h4>
              <p className="text-sm text-[#aaa] leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">
                Event Details
              </h4>

              <div className="space-y-3">
                {/* Date */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Date</p>
                    <p className="text-sm font-medium text-white">
                      {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Time</p>
                    <p className="text-sm font-medium text-white">
                      {format(new Date(event.date), 'hh:mm a')}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Location</p>
                    <p className="text-sm font-medium text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#141414] border border-[#262626]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777]">Organized by</p>
                    <p className="text-sm font-medium text-white">
                      {event.createdBy.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
