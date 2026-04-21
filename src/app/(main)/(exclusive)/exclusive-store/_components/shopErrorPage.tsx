// components/shop/ShopError.tsx
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ShopErrorProps {
  message?: string
  onRetry?: () => void
}

export function ShopError({ message, onRetry }: ShopErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-4 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Oops! Something went wrong
          </h3>
          <p className="text-zinc-400 text-sm">
            {message || 'Failed to load products. Please try again later.'}
          </p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
