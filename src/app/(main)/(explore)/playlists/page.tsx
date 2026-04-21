import React from 'react'
import SingleBanner from '@/components/landing/singleBanner'
import MusicSection from '@/components/sections/musicSection'
import { getMusicContents } from '@/lib/api/contentApi'
import ModalManager from '@/components/modals/modalManager'

export default async function Page() {
  // music data fetch
  const musicContents = await getMusicContents()

  return (
    <div className="flex flex-col gap-10">
      {/* Banner */}
      <SingleBanner type="playLists" />

      {/* Music / Playlists Section */}
      <MusicSection
        contents={musicContents}
        itemsPerPage={12}
        showPagination={true}
      />

      {/* Modal Manager */}
      <ModalManager />
    </div>
  )
}
