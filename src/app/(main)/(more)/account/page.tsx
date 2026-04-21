'use client'

import React, { useEffect } from 'react'
import SettingsPage from './_components/settingsPage'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PlansPage from '../../plans/_components/plan-management'
import { Loader2, Crown, Shield } from 'lucide-react'
import { useUserStore } from '@/app/store/useUserProfileStore'

const SubscriptionBadge = () => {
  const { user, getSubscriptionName } = useUserStore()

  if (!user || !user.subscription) return null

  const planName = getSubscriptionName()
  const isExclusive = planName?.toLowerCase() === 'exclusive'

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
      ${isExclusive
        ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-500 border border-yellow-500/30'
        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}
    `}>
      {isExclusive ? <Crown className="w-3.5 h-3.5 fill-yellow-500" /> : <Shield className="w-3.5 h-3.5" />}
      {planName || 'Free Plan'}
    </div>
  )
}

const Page = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin')
    }
  }, [status, router])

  // Session loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-white mx-auto" />
          <p className="text-[#b5b5b5] text-sm">Loading your account...</p>
        </div>
      </div>
    )
  }

  // Authenticated user
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen bg-[#0b0b0b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Page Header */}
          <div className="py-8 border-b border-[#262626]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Account Settings
                </h1>
                <SubscriptionBadge />
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
            <p className="text-[#b5b5b5] text-sm md:text-base">
              Manage your profile, security, and subscription preferences
            </p>
          </div>

          {/* Content Sections */}
          <div className="py-10 space-y-16">
            {/* Settings Section */}
            <section>
              <SettingsPage />
            </section>

            {/* Divider */}
            <div className="border-t border-[#262626]" />

            {/* Plans Section */}
            <section>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Subscription Plans
                </h2>
                <p className="text-[#b5b5b5] text-sm md:text-base">
                  Choose the plan that best fits your needs
                </p>
              </div>
              <PlansPage />
            </section>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Page
