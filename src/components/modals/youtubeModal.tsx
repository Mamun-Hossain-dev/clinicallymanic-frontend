'use client'

import { X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface YouTubeModalProps {
  isOpen: boolean
  videoId: string
  onClose: () => void
}

export default function YouTubeModal({
  isOpen,
  videoId,
  onClose,
}: YouTubeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 bg-black border-0">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5 text-black bg-white" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
