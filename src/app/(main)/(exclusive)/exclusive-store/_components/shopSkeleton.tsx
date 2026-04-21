// components/shop/ShopSkeleton.tsx
export function ShopSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl bg-zinc-900 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Shop name */}
            <div className="h-3 w-20 bg-zinc-800 rounded" />

            {/* Title */}
            <div className="h-5 bg-zinc-800 rounded w-3/4" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-zinc-800 rounded" />
              <div className="h-3 bg-zinc-800 rounded w-5/6" />
            </div>

            {/* Price */}
            <div className="h-6 bg-zinc-800 rounded w-1/3 mt-3" />

            {/* Sizes */}
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-10 bg-zinc-800 rounded" />
              <div className="h-6 w-10 bg-zinc-800 rounded" />
              <div className="h-6 w-10 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
