'use client'

import { create } from 'zustand'

/* =======================
   YouTube Modal State
======================= */
type YouTubeModalState = {
  isOpen: boolean
  videoId: string
}

/* =======================
   Spotify Modal State
======================= */
type SpotifyModalState = {
  isOpen: boolean
  title: string
  description: string
  thumbnail: string
  url: string
}

/* =======================
   Store Interface
======================= */
type ModalStore = {
  youTubeModal: YouTubeModalState
  spotifyModal: SpotifyModalState

  openYouTubeModal: (videoId: string) => void
  closeYouTubeModal: () => void

  openSpotifyModal: (data: {
    title: string
    description?: string
    thumbnail: string
    url: string
  }) => void
  closeSpotifyModal: () => void
}

/* =======================
   Store Implementation
======================= */
export const useModalStore = create<ModalStore>(set => ({
  /* ---------- YouTube ---------- */
  youTubeModal: {
    isOpen: false,
    videoId: '',
  },

  openYouTubeModal: videoId =>
    set({
      youTubeModal: {
        isOpen: true,
        videoId,
      },
    }),

  closeYouTubeModal: () =>
    set({
      youTubeModal: {
        isOpen: false,
        videoId: '',
      },
    }),

  /* ---------- Spotify ---------- */
  spotifyModal: {
    isOpen: false,
    title: '',
    description: '',
    thumbnail: '',
    url: '',
  },

  openSpotifyModal: data =>
    set({
      spotifyModal: {
        isOpen: true,
        title: data.title,
        description: data.description || '',
        thumbnail: data.thumbnail,
        url: data.url,
      },
    }),

  closeSpotifyModal: () =>
    set({
      spotifyModal: {
        isOpen: false,
        title: '',
        description: '',
        thumbnail: '',
        url: '',
      },
    }),
}))
