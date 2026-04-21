// components/loading/ContentLoading.tsx

interface ContentLoadingProps {
  count?: number
  variant?: 'card' | 'list' | 'hero'
}

export default function ContentLoading({
  count = 6,
  variant = 'card',
}: ContentLoadingProps) {
  if (variant === 'hero') {
    return (
      <div className="relative h-96 overflow-hidden rounded-xl bg-zinc-800/50 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 space-y-4">
          <div className="h-8 bg-zinc-700/50 rounded w-3/4" />
          <div className="h-4 bg-zinc-700/50 rounded w-1/2" />
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 rounded-lg bg-zinc-800/50 animate-pulse"
          >
            <div className="w-32 h-32 bg-zinc-700/50 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-zinc-700/50 rounded w-3/4" />
              <div className="h-4 bg-zinc-700/50 rounded w-full" />
              <div className="h-4 bg-zinc-700/50 rounded w-5/6" />
              <div className="flex gap-2 mt-3">
                <div className="h-6 w-20 bg-zinc-700/50 rounded-full" />
                <div className="h-6 w-24 bg-zinc-700/50 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default: card variant
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg bg-zinc-800/50 animate-pulse"
        >
          {/* Thumbnail skeleton */}
          <div className="h-48 bg-zinc-700/50" />

          {/* Content skeleton */}
          <div className="p-5 space-y-3">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-4 bg-zinc-700/50 rounded w-full" />
              <div className="h-4 bg-zinc-700/50 rounded w-4/5" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-zinc-700/50 rounded w-full" />
              <div className="h-3 bg-zinc-700/50 rounded w-3/4" />
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-6 w-20 bg-zinc-700/50 rounded-full" />
              <div className="h-3 w-16 bg-zinc-700/50 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Compact loading variant for smaller cards
export function ContentLoadingCompact({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg bg-zinc-800/50 animate-pulse"
        >
          <div className="aspect-square bg-zinc-700/50" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-zinc-700/50 rounded w-full" />
            <div className="h-3 bg-zinc-700/50 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Section loading with title
export function SectionLoading({ title }: { title?: string }) {
  return (
    <section className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="h-4 w-20 bg-zinc-700/50 rounded animate-pulse" />
        </div>
      )}
      <ContentLoading count={6} />
    </section>
  )
}
