'use client'

import { XCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PlansCancelPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-[#262626] rounded-xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500 rounded-full p-4">
            <XCircle className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Payment Cancelled
        </h1>
        <p className="text-[#b5b5b5] mb-8">
          Your subscription payment was cancelled. No charges have been made.
        </p>

        {/* Button */}
        <Link href="/plans">
          <Button className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-6 rounded-lg transition-all">
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        </Link>
      </div>
    </div>
  )
}
