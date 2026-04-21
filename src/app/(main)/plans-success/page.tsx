'use client'

import { CheckCircle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PlansSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-[#262626] rounded-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Payment Successful!
        </h1>
        <p className="text-[#b5b5b5] mb-8">
          Your subscription has been activated successfully.
        </p>

        {/* Button */}
        <Link href="/">
          <Button className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-6 rounded-lg transition-all">
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
