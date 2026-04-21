'use client'
import { useUserStore } from '@/app/store/useUserProfileStore'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function ExclusiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isExclusivePlan, isBasicPlan, isSubscriptionExpired } = useUserStore()
  const { status } = useSession()
  const [isStoreLoaded, setIsStoreLoaded] = useState(false)

  // Unified access check helper
  const hasAccess = useCallback(() => {
    if (!user) return false
    if (user.role === 'admin') return true
    if (isExclusivePlan()) return true
    if (isBasicPlan() && !isSubscriptionExpired()) return true
    return false
  }, [user, isExclusivePlan, isBasicPlan, isSubscriptionExpired])

  useEffect(() => {
    // Wait for store to be populated if authenticated
    if (status === 'authenticated' && user) {
      setIsStoreLoaded(true)
    } else if (status === 'unauthenticated') {
      setIsStoreLoaded(true) // Ready to redirect
    }
  }, [status, user])

  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      toast.error('Please sign in to access content')
      router.push('/signin')
      return
    }

    if (status === 'authenticated' && isStoreLoaded) {
      if (!user) return

      if (!hasAccess()) {
        // Specific error messages
        if (isBasicPlan() && isSubscriptionExpired()) {
          toast.error('Your Basic plan trial has expired. Please upgrade.')
        } else {
          toast.error('This content requires an active subscription')
        }
        router.push('/plans')
      }
    }
  }, [status, router, user, isBasicPlan, isExclusivePlan, isSubscriptionExpired, isStoreLoaded, hasAccess])

  if (status === 'loading' || (status === 'authenticated' && !isStoreLoaded)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0b0b0b]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  // Protection check before rendering children
  if (
    status === 'unauthenticated' ||
    (status === 'authenticated' && !hasAccess())
  ) {
    return null
  }

  return <>{children}</>
}
