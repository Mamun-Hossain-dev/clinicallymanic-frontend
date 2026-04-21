'use client'

import Image from 'next/image'
// import { Button } from '@/components/ui/button'

interface NoDataProps {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

export default function NoData({
  title = 'No Data Available',
  description = 'We couldn’t find any content here right now. Please check back later.',
}: // actionText,
// onAction,
NoDataProps) {
  return (
    <div className="flex min-h-[25vh] mb-10 flex-col items-center justify-center text-center px-4">
      {/* Image */}
      <div className="relative w-[280px] h-[220px] mb-6 opacity-90">
        <Image
          src="/404.png"
          alt="No data available"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold text-white tracking-wide">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-400">{description}</p>

      {/* Optional Action */}
      {/* {actionText && onAction && (
        <Button
          onClick={onAction}
          className="mt-6 bg-white text-black hover:bg-gray-200"
        >
          {actionText}
        </Button>
      )} */}
    </div>
  )
}
