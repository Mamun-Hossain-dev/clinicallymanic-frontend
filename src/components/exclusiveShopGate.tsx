'use client'

import { useSession } from 'next-auth/react'
import { useUserStore } from '@/app/store/useUserProfileStore'

import { ReactNode } from 'react'

interface ExclusiveShopGateProps {
  children: ReactNode
}

export default function ExclusiveShopGate({
  children,
}: ExclusiveShopGateProps) {
  const { status } = useSession()
  const { user, isExclusivePlan } = useUserStore()

  // If user is authenticated and has exclusive plan, show the content
  if (status === 'authenticated' && user && isExclusivePlan()) {
    return <>{children}</>
  }

  // If user is not authenticated or doesn't have exclusive plan, show nothing
  // (or optionally show a locked message)
  return null

  // Alternative: Show a locked message instead of hiding completely
  // Uncomment below if you want to show a "locked" message instead of hiding
  /*
  return (
    <div className="relative">
      {/* Blurred Preview *\/}
      <div className="blur-sm pointer-events-none select-none opacity-40">
        {children}
      </div>
      
      {/* Overlay Message *\/}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-8 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            Exclusive Content
          </h3>
          
          <p className="text-[#b5b5b5] mb-6">
            {status !== 'authenticated' 
              ? 'Sign in and upgrade to Exclusive plan to access our exclusive shop.'
              : 'Upgrade to Exclusive plan to access our exclusive shop and special offers.'
            }
          </p>
          
          <Link
            href={status !== 'authenticated' ? '/signin' : '/plans'}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Crown className="w-5 h-5" />
            {status !== 'authenticated' ? 'Sign In' : 'Upgrade to Exclusive'}
          </Link>
        </div>
      </div>
    </div>
  )
  */
}
