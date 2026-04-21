/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, Zap, Star, Sparkles, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  useGetSubscriptions,
  usePaySubscription,
} from '@/lib/api/subscriptionApi'
import { toast } from 'sonner'
import { useState } from 'react'

const planIcons = {
  basic: Star,
  exclusive: Zap,
}

const planColors = {
  basic: 'from-blue-500 to-blue-600',
  exclusive: 'from-purple-500 to-purple-600',
}

export default function PlansPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { data: subscriptionsData, isLoading } = useGetSubscriptions()
  const payMutation = usePaySubscription()
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleSubscribe = async (subscriptionId: string) => {
    if (!session?.user?.accessToken) {
      toast.error('Please sign in to subscribe')
      router.push('/signin')
      return
    }

    setProcessingId(subscriptionId)

    try {
      const result = await payMutation.mutateAsync({
        subscriptionId,
        token: session.user.accessToken,
      })

      if (result.success && result.data?.url) {
        toast.success('Redirecting to payment...')
        window.location.href = result.data.url
      } else {
        toast.error('Failed to initiate payment')
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to process subscription',
      )
    } finally {
      setProcessingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-white text-lg">Loading plans...</p>
        </div>
      </div>
    )
  }

  const plans = subscriptionsData?.data || []

  // Sort plans: basic (weekly) first, exclusive yearly (pro) second, exclusive monthly third
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.name === 'basic') return -1
    if (b.name === 'basic') return 1
    if (a.type === 'yearly') return -1
    if (b.type === 'yearly') return 1
    return 0
  })

  // Calculate yearly savings
  const getYearlySavings = (yearlyPrice: number) => {
    const monthlyPlan = plans.find(
      (p: any) => p.name === 'exclusive' && p.type === 'monthly',
    )
    if (monthlyPlan) {
      const monthlyTotal = monthlyPlan.price * 12
      const savings = monthlyTotal - yearlyPrice
      const percentage = Math.round((savings / monthlyTotal) * 100)
      return { savings, percentage }
    }
    return { savings: 0, percentage: 20 }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold">
              SUBSCRIPTION PLANS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-[#b5b5b5] max-w-2xl mx-auto">
            Unlock exclusive content, premium features, and priority support
            with our flexible subscription options
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sortedPlans.map((plan: any) => {
            const key = plan.name.toLowerCase()
            const Icon = planIcons[key as keyof typeof planIcons] || Star
            const colorClass =
              planColors[key as keyof typeof planColors] ||
              'from-gray-500 to-gray-600'

            const features: string[] = Array.isArray(plan.features)
              ? plan.features
              : typeof plan.features === 'string'
                ? plan.features.split(',').map((f: string) => f.trim())
                : []

            const isBasic = key === 'basic'
            const isYearly = plan.type === 'yearly'
            const isPro = key === 'exclusive' && isYearly

            const yearlySavings = isYearly ? getYearlySavings(plan.price) : null

            // Display names
            const displayName = isPro
              ? 'Pro'
              : plan.name === 'exclusive'
                ? 'Exclusive'
                : 'Basic'

            return (
              <div
                key={plan._id}
                className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                  isPro
                    ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 via-[#0f0f0f] to-[#0f0f0f] md:scale-110 shadow-2xl shadow-purple-500/30 z-10'
                    : isBasic
                      ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/10 via-[#0f0f0f] to-[#0f0f0f]'
                      : 'border-[#262626] bg-[#0f0f0f] hover:border-[#404040]'
                }`}
              >
                {/* Badge */}
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      BEST VALUE - SAVE {yearlySavings?.percentage}%
                    </div>
                  </div>
                )}

                {isBasic && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      🎉 7 DAYS FREE TRIAL
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClass} mb-6 shadow-lg`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Name */}
                <h3 className="text-3xl font-bold text-white mb-3 capitalize">
                  {displayName}
                </h3>

                {/* Type Badge */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
                  <span className="text-sm text-purple-400 font-semibold capitalize">
                    {plan.type === 'weekly'
                      ? 'Weekly'
                      : plan.type === 'monthly'
                        ? 'Monthly'
                        : 'Yearly'}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-[#b5b5b5] text-lg">
                      /
                      {plan.type === 'weekly'
                        ? 'week'
                        : plan.type === 'monthly'
                          ? 'month'
                          : 'year'}
                    </span>
                  </div>
                  {isYearly && yearlySavings && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-semibold">
                        💰 Save ${yearlySavings.savings} annually
                      </span>
                    </div>
                  )}
                  {isBasic && (
                    <p className="text-blue-400 text-sm font-semibold">
                      ✨ Get 7-day trial with full access to exclusive content
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span
                        className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} flex-shrink-0`}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </span>
                      <span className="text-sm text-[#d1d1d1] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  onClick={() => handleSubscribe(plan._id)}
                  disabled={
                    processingId === plan._id || plan.status !== 'active'
                  }
                  className={`w-full py-7 text-base font-bold rounded-xl transition-all shadow-lg ${
                    isPro
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white shadow-purple-500/50'
                      : isBasic
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-blue-500/50'
                        : 'bg-white hover:bg-gray-100 text-black'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {processingId === plan._id
                    ? 'Processing...'
                    : plan.status !== 'active'
                      ? 'Not Available'
                      : isBasic
                        ? 'Start Free Trial'
                        : 'Subscribe Now'}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center space-y-4">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>🔒 Secure Payment</span>
            <span>⚡ Instant Access</span>
            <span>🎯 No Hidden Fees</span>
          </div>
        </div>
      </div>
    </div>
  )
}
