'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useGetUserProfile } from '@/lib/api/profileApi'
import { useUserStore } from '@/app/store/useUserProfileStore'

export function StoreInitializer() {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''
  const { data: profileData } = useGetUserProfile(accessToken)
  const { setUser } = useUserStore()

  useEffect(() => {
    if (profileData?.data) {
      setUser(profileData.data)
    }
  }, [profileData, setUser])

  return null
}
