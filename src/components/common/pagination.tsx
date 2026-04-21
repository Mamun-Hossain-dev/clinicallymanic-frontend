// components/Pagination.tsx
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5 // Maximum page numbers to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      {/* Stats */}
      <div className="text-center tracking-wide">
        <p className="text-sm text-zinc-400">
          Showing {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
          {totalItems} products
        </p>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-3">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-10 w-10 items-center justify-center text-zinc-500"
                >
                  ...
                </span>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={isLoading}
                className={`flex h-10 w-10 items-center justify-center rounded-lg font-semibold transition-all disabled:cursor-not-allowed ${
                  isActive
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
