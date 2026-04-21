'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import YouTubeModal from './youtubeModal'
import SpotifyModal from './spotifyModal'
import { useModalStore } from '@/app/store/useModalStore'

export default function ModalManager() {
  const pathname = usePathname()

  const { youTubeModal, closeYouTubeModal, closeSpotifyModal } = useModalStore()

  // Route change → close all modals
  useEffect(() => {
    closeYouTubeModal()
    closeSpotifyModal()
  }, [pathname, closeYouTubeModal, closeSpotifyModal])

  return (
    <>
      <YouTubeModal
        isOpen={youTubeModal.isOpen}
        videoId={youTubeModal.videoId}
        onClose={closeYouTubeModal}
      />

      <SpotifyModal />
    </>
  )
}
