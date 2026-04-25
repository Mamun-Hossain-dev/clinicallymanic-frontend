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
        successUrl: `${window.location.origin}/plans-success`,
        cancelUrl: `${window.location.origin}/plans-cancel`,
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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
          <p className="text-[#9A9A9F] text-[14px]">Loading plans...</p>
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
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1]">
            <Sparkles className="h-3.5 w-3.5 text-[#9A9A9F]" />
            <span className="text-[#9A9A9F] text-[11px] font-semibold uppercase tracking-[0.12em]">
              SUBSCRIPTION PLANS
            </span>
          </div>
          <h1 className="text-[42px] md:text-[54px] font-bold text-[#F5F5F7] tracking-[-0.02em] mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-[16px] text-[#9A9A9F] max-w-2xl mx-auto line-height-relaxed">
            Unlock exclusive content, premium features, and priority support
            with our flexible subscription options
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sortedPlans.map((plan: any) => {
            const key = plan.name.toLowerCase()
            const Icon = planIcons[key as keyof typeof planIcons] || Star

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
                className={`relative rounded-[16px] p-8 border transition-all duration-300 ${isPro
                  ? 'border-white/[0.2] bg-[#1a1a1a] md:scale-105 z-10'
                  : isBasic
                    ? 'border-white/[0.12] bg-[#161616]'
                    : 'border-white/[0.07] bg-[#161616] hover:border-white/[0.14]'
                  }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-white text-black px-6 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      BEST VALUE — SAVE {yearlySavings?.percentage}%
                    </div>
                  </div>
                )}

                {isBasic && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-[#F5F5F7] text-black px-6 py-1.5 rounded-full text-[11px] font-bold">
                      🎉 7 DAYS FREE TRIAL
                    </div>
                  </div>
                )}

                <div
                  className={`inline-flex p-3 rounded-[10px] bg-white/[0.07] mb-6`}
                >
                  <Icon className="h-6 w-6 text-[#9A9A9F]" />
                </div>

                <h3 className="text-[24px] font-bold text-[#F5F5F7] mb-2 capitalize">
                  {displayName}
                </h3>

                <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] mb-6">
                  <span className="text-[12px] text-[#9A9A9F] font-medium capitalize">
                    {plan.type === 'weekly' ? 'Weekly' : plan.type === 'monthly' ? 'Monthly' : 'Yearly'}
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[52px] font-bold text-[#F5F5F7]">
                      ${plan.price}
                    </span>
                    <span className="text-[#6E6E73] text-[15px]">
                      /{plan.type === 'weekly' ? 'week' : plan.type === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {isYearly && yearlySavings && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#9A9A9F] text-[13px] font-medium">
                        💰 Save ${yearlySavings.savings} annually
                      </span>
                    </div>
                  )}
                  {isBasic && (
                    <p className="text-[#9A9A9F] text-[13px] font-medium">
                      ✨ Get 7-day trial with full access to exclusive content
                    </p>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08] flex-shrink-0">
                        <Check className="h-3 w-3 text-[#9A9A9F]" />
                      </span>
                      <span className="text-[13px] text-[#9A9A9F] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan._id)}
                  disabled={processingId === plan._id || plan.status !== 'active'}
                  className={`w-full py-6 text-[14px] font-bold rounded-full transition-all ${isPro
                    ? 'bg-white text-black hover:bg-white/85'
                    : isBasic
                      ? 'bg-white text-black hover:bg-white/85'
                      : 'bg-white/[0.08] text-[#F5F5F7] border border-white/[0.12] hover:bg-white/[0.12]'
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

        <div className="mt-20 text-center space-y-4">
          <div className="flex items-center justify-center gap-8 text-[12px] text-[#6E6E73]">
            <span>🔒 Secure Payment</span>
            <span>⚡ Instant Access</span>
            <span>🎯 No Hidden Fees</span>
          </div>
        </div>
      </div>
    </div>
  )
}
