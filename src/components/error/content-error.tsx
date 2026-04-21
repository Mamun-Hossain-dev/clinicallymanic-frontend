// components/error/ContentError.tsx
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ContentErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export default function ContentError({
  title = 'Something went wrong',
  message = 'Failed to load content. Please try again.',
  onRetry,
  showRetry = true,
}: ContentErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md text-center space-y-4">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-zinc-400 text-sm">{message}</p>
        </div>

        {/* Retry Button */}
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

// Inline error variant (smaller, less prominent)
export function InlineError({
  message,
  onRetry,
}: Pick<ContentErrorProps, 'message' | 'onRetry'>) {
  return (
    <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <p className="text-sm text-red-400">{message || 'Failed to load'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

// Empty state (when no error but no data)
export function EmptyState({
  title = 'No content found',
  description = 'There are no items to display at this time.',
  icon: Icon = AlertCircle,
}: {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-zinc-800 p-4">
            <Icon className="w-12 h-12 text-zinc-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
