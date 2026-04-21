// app/(main)/payment/success/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push('/exclusive-fashion')
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-500/10 via-background to-blue-500/10">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle className="h-24 w-24 text-green-500 relative" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase
          </p>
        </div>

        {/* Session Info */}
        {sessionId && (
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Transaction ID</p>
            <p className="text-xs font-mono text-foreground break-all">
              {sessionId}
            </p>
          </div>
        )}

        {/* Order Info */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            <span className="font-semibold">Order Confirmed</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your order has been successfully processed. You will receive a
            confirmation email shortly with your order details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/exclusive-fashion" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            Redirecting in {countdown} seconds...
          </p>
        </div>

        {/* Additional Info */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help? Contact our support team at support@example.com
          </p>
        </div>
      </div>
    </div>
  )
}
